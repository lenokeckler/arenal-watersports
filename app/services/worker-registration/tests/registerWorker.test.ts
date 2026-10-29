import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  POSTGRES_ERROR_CODE,
  SUPABASE_AUTH_ERROR_CODE,
  SUPABASE_RPC,
  SUPABASE_TABLE,
  WORKER_REGISTRATION_ERROR_CODE,
} from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { toAuthEmail } from "@/app/utils/username/toAuthEmail";
import { generateTemporaryPassword } from "../generateTemporaryPassword";
import { registerWorker } from "../registerWorker";
import { SERVICE_FIXTURE } from "./WorkerRegistrationService.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

vi.mock("../generateTemporaryPassword", () => ({
  generateTemporaryPassword: vi.fn(),
}));

const getUser = vi.fn();
const rpc = vi.fn();
const insert = vi.fn();
const from = vi.fn(() => ({ insert }));
const createUser = vi.fn();
const deleteUser = vi.fn();

const supabase = {
  auth: { getUser },
  from,
  rpc,
} as unknown as ServerSupabaseClient;

const signInAs = (userId: string | null): void => {
  getUser.mockResolvedValue({
    data: { user: userId ? { id: userId } : null },
    error: null,
  });
};

const register = () =>
  registerWorker(supabase, SERVICE_FIXTURE.REGISTRATION);

describe("registerWorker", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    from.mockImplementation(() => ({ insert }));
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({
      auth: { admin: { createUser, deleteUser } },
    } as unknown as ReturnType<
      typeof createServiceRoleSupabaseClient
    >);
    vi.mocked(generateTemporaryPassword).mockReturnValue(
      SERVICE_FIXTURE.TEMPORARY_PASSWORD
    );
    signInAs(SERVICE_FIXTURE.ADMIN_ID);
    rpc.mockResolvedValue({ data: true, error: null });
    createUser.mockResolvedValue({
      data: { user: { id: SERVICE_FIXTURE.NEW_WORKER_ID } },
      error: null,
    });
    insert.mockResolvedValue({ error: null });
    deleteUser.mockResolvedValue({ error: null });
  });

  it("registers the worker and returns the temporary password once", async () => {
    expect(await register()).toEqual({
      ok: true,
      registered: {
        ...SERVICE_FIXTURE.REGISTRATION,
        temporaryPassword:
          SERVICE_FIXTURE.TEMPORARY_PASSWORD,
      },
    });
  });

  it("asks the database whether the caller is administration", async () => {
    await register();

    expect(rpc).toHaveBeenCalledWith(SUPABASE_RPC.IS_ADMIN);
  });

  it("creates a confirmed account from the username with the generated password", async () => {
    await register();

    expect(createUser).toHaveBeenCalledWith({
      email: toAuthEmail(
        SERVICE_FIXTURE.REGISTRATION.username
      ),
      email_confirm: true,
      password: SERVICE_FIXTURE.TEMPORARY_PASSWORD,
    });
  });

  it("writes the worker under the caller's session, pending a password change", async () => {
    await register();

    expect(from).toHaveBeenCalledWith(
      SUPABASE_TABLE.WORKERS
    );
    expect(insert).toHaveBeenCalledWith({
      base_role: SERVICE_FIXTURE.REGISTRATION.baseRole,
      created_by: SERVICE_FIXTURE.ADMIN_ID,
      full_name: SERVICE_FIXTURE.REGISTRATION.fullName,
      id: SERVICE_FIXTURE.NEW_WORKER_ID,
      must_change_password: true,
      updated_by: SERVICE_FIXTURE.ADMIN_ID,
      username: SERVICE_FIXTURE.REGISTRATION.username,
    });
  });

  it("refuses a caller without a session and creates nothing", async () => {
    signInAs(null);

    expect(await register()).toEqual({
      ok: false,
      code: WORKER_REGISTRATION_ERROR_CODE.NOT_ALLOWED,
    });
    expect(createUser).not.toHaveBeenCalled();
  });

  it("refuses a caller who is not administration and creates nothing", async () => {
    rpc.mockResolvedValue({ data: false, error: null });

    expect(await register()).toEqual({
      ok: false,
      code: WORKER_REGISTRATION_ERROR_CODE.NOT_ALLOWED,
    });
    expect(createUser).not.toHaveBeenCalled();
  });

  it("fails loudly when the administration check fails", async () => {
    rpc.mockResolvedValue({
      data: null,
      error: { message: SERVICE_FIXTURE.ERROR_MESSAGE },
    });

    await expect(register()).rejects.toThrow();
    expect(createUser).not.toHaveBeenCalled();
  });

  it.each([
    [
      SUPABASE_AUTH_ERROR_CODE.EMAIL_EXISTS,
      WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN,
    ],
    [
      SERVICE_FIXTURE.OTHER_AUTH_ERROR_CODE,
      WORKER_REGISTRATION_ERROR_CODE.FAILED,
    ],
  ])(
    "reports %s from the account creation as %s and writes no worker",
    async (authErrorCode, expectedCode) => {
      createUser.mockResolvedValue({
        data: { user: null },
        error: { code: authErrorCode },
      });

      expect(await register()).toEqual({
        ok: false,
        code: expectedCode,
      });
      expect(insert).not.toHaveBeenCalled();
    }
  );

  it.each([
    [
      POSTGRES_ERROR_CODE.UNIQUE_VIOLATION,
      WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN,
    ],
    [
      SERVICE_FIXTURE.OTHER_POSTGRES_ERROR_CODE,
      WORKER_REGISTRATION_ERROR_CODE.FAILED,
    ],
  ])(
    "undoes the account when the worker row fails with %s",
    async (postgresErrorCode, expectedCode) => {
      insert.mockResolvedValue({
        error: { code: postgresErrorCode },
      });

      expect(await register()).toEqual({
        ok: false,
        code: expectedCode,
      });
      expect(deleteUser).toHaveBeenCalledWith(
        SERVICE_FIXTURE.NEW_WORKER_ID
      );
    }
  );

  it("never undoes the account of a registered worker", async () => {
    await register();

    expect(deleteUser).not.toHaveBeenCalled();
  });
});
