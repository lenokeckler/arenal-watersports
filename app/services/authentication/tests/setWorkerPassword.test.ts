import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { AuthApiError } from "@supabase/supabase-js";
import {
  HTTP_STATUS,
  PASSWORD_CHANGE_ERROR_CODE,
  SUPABASE_AUTH_ERROR_CODE,
} from "@/app/constants";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { setWorkerPassword } from "../setWorkerPassword";
import {
  REAL_WEAK_PASSWORD_ERROR,
  SAME_PASSWORD_ERROR,
} from "./passwordUpdateErrors.constants";
import {
  NEW_WORKER_PASSWORD,
  WORKER_USER_ID,
} from "./setWorkerPassword.constants";

vi.mock("@/app/services/supabase", () => ({
  createServiceRoleSupabaseClient: vi.fn(),
}));

const updateUserById = vi.fn();

describe("setWorkerPassword", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    updateUserById.mockResolvedValue({ error: null });
    vi.mocked(
      createServiceRoleSupabaseClient
    ).mockReturnValue({
      auth: { admin: { updateUserById } },
    } as unknown as ReturnType<
      typeof createServiceRoleSupabaseClient
    >);
  });

  it("sends exactly the user id and the password to the admin API", async () => {
    await setWorkerPassword(
      WORKER_USER_ID,
      NEW_WORKER_PASSWORD
    );

    expect(updateUserById).toHaveBeenCalledOnce();
    expect(updateUserById).toHaveBeenCalledWith(
      WORKER_USER_ID,
      { password: NEW_WORKER_PASSWORD }
    );
  });

  it("returns null when the password was set", async () => {
    await expect(
      setWorkerPassword(WORKER_USER_ID, NEW_WORKER_PASSWORD)
    ).resolves.toBeNull();
  });

  it.each([
    [
      "a rejected password",
      SAME_PASSWORD_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
    ],
    [
      "a weak password thrown as the library does",
      REAL_WEAK_PASSWORD_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES,
    ],
  ])("maps %s", async (_name, error, code) => {
    updateUserById.mockResolvedValue({ error });

    const result = await setWorkerPassword(
      WORKER_USER_ID,
      NEW_WORKER_PASSWORD
    );

    expect(result?.code).toBe(code);
  });

  it("never carries the password into the returned error", async () => {
    updateUserById.mockResolvedValue({
      error: new AuthApiError(
        NEW_WORKER_PASSWORD,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        SUPABASE_AUTH_ERROR_CODE.WEAK_PASSWORD
      ),
    });

    const result = await setWorkerPassword(
      WORKER_USER_ID,
      NEW_WORKER_PASSWORD
    );

    expect(JSON.stringify(result)).not.toContain(
      NEW_WORKER_PASSWORD
    );
  });
});
