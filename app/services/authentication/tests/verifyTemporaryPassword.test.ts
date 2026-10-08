import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  FIRST_SIGN_IN_ERROR_CODE,
  SUPABASE_SIGN_OUT_SCOPE,
} from "@/app/constants";
import { SupabaseAuthOperationError } from "@/app/utils/supabase-error/SupabaseAuthError";
import { NORMALIZED_AUTH_EMAIL } from "@/app/utils/sign-in/tests/signIn.constants";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { verifyTemporaryPassword } from "../verifyTemporaryPassword";
import {
  FIRST_SIGN_IN_WORKER,
  TEMPORARY_PASSWORD,
} from "./firstSignIn.constants";
import { BLOCKED_BY_ATTEMPTS_ERROR } from "./hookRejectionErrors.constants";
import {
  INVALID_CREDENTIALS_ERROR,
  NETWORK_ERROR,
  RATE_LIMIT_BY_CODE_ERROR,
} from "./mapSignInAuthError.constants";
import {
  captureThrowawayCredentials,
  captureThrowawaySignOutOptions,
  mockThrowawayClient,
  throwawaySignInWithPassword,
  throwawaySignOut,
} from "./mockThrowawayClient";
import { RPC_FAILURE } from "./recordSignIn.constants";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);

vi.mock(
  "../recordFailedSignIn",
  () => import("./mocks/recordFailedSignIn.mock")
);

const verify = () =>
  verifyTemporaryPassword(
    FIRST_SIGN_IN_WORKER,
    TEMPORARY_PASSWORD
  );

const rejectSignInWith = (error: unknown): void => {
  throwawaySignInWithPassword.mockResolvedValue({
    data: {},
    error,
  });
};

describe("verifyTemporaryPassword", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockThrowawayClient();
  });

  it("signs in with the worker email and discards the extra session", async () => {
    const credentialsOf = captureThrowawayCredentials();
    const signOutOptionsOf =
      captureThrowawaySignOutOptions();

    await expect(verify()).resolves.toBeNull();

    expect(
      throwawaySignInWithPassword
    ).toHaveBeenCalledOnce();
    expect(credentialsOf()).toEqual({
      email: NORMALIZED_AUTH_EMAIL,
      password: TEMPORARY_PASSWORD,
    });
    expect(throwawaySignOut).toHaveBeenCalledOnce();
    expect(signOutOptionsOf()).toEqual({
      scope: SUPABASE_SIGN_OUT_SCOPE.LOCAL,
    });
    expect(recordFailedSignIn).not.toHaveBeenCalled();
  });

  it("records one failure for a wrong temporary password", async () => {
    rejectSignInWith(INVALID_CREDENTIALS_ERROR);

    const result = await verify();

    expect(recordFailedSignIn).toHaveBeenCalledOnce();
    expect(recordFailedSignIn).toHaveBeenCalledWith(
      FIRST_SIGN_IN_WORKER.username
    );
    expect(result?.code).toBe(
      FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_INVALID
    );
    expect(throwawaySignOut).not.toHaveBeenCalled();
  });

  it.each([
    ["a block by attempts", BLOCKED_BY_ATTEMPTS_ERROR],
    ["a network error", NETWORK_ERROR],
    ["a rate limit", RATE_LIMIT_BY_CODE_ERROR],
  ])(
    "does not record a failure for %s",
    async (_name, error) => {
      rejectSignInWith(error);

      await expect(verify()).resolves.not.toBeNull();
      expect(recordFailedSignIn).not.toHaveBeenCalled();
    }
  );

  it("rejects when the failure cannot be recorded", async () => {
    rejectSignInWith(INVALID_CREDENTIALS_ERROR);
    vi.mocked(recordFailedSignIn).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(verify()).rejects.toThrow(
      RPC_FAILURE.message
    );
  });

  it("rejects with a typed error that keeps the cause when the extra session cannot be discarded", async () => {
    throwawaySignOut.mockResolvedValue({
      error: NETWORK_ERROR,
    });

    const failure = await verify().catch(
      (error: Error) => error
    );

    expect(failure).toBeInstanceOf(
      SupabaseAuthOperationError
    );
    expect((failure as Error).cause).toBe(NETWORK_ERROR);
    expect((failure as Error).message).not.toContain(
      NETWORK_ERROR.message
    );
  });
});
