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
  NETWORK_ERROR,
  NON_API_ERROR,
  RATE_LIMIT_BY_CODE_ERROR,
  SERVER_ERROR,
} from "./mapSignInAuthError.constants";
import {
  CURRENT_PASSWORD_MISMATCH_ERROR,
  CURRENT_PASSWORD_REQUIRED_ERROR,
  SAME_PASSWORD_ERROR,
  VALIDATION_FAILED_ERROR,
  WEAK_PASSWORD_ERROR,
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
      "the same password",
      SAME_PASSWORD_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
    ],
    [
      "a weak password",
      WEAK_PASSWORD_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES,
    ],
    [
      "a failed validation",
      VALIDATION_FAILED_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_TOO_LONG,
    ],
    [
      "a wrong current password",
      CURRENT_PASSWORD_MISMATCH_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID,
    ],
    [
      "a missing current password",
      CURRENT_PASSWORD_REQUIRED_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_REQUIRED,
    ],
    [
      "a rate limit",
      RATE_LIMIT_BY_CODE_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.TOO_MANY_REQUESTS,
    ],
    [
      "a retryable fetch error",
      NETWORK_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NETWORK,
    ],
    [
      "a server error",
      SERVER_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.UNKNOWN,
    ],
    [
      "an unclassified error",
      NON_API_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.UNKNOWN,
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
