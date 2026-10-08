import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";
import { NORMALIZED_AUTH_EMAIL } from "@/app/utils/sign-in/tests/signIn.constants";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { verifyTemporaryPassword } from "../verifyTemporaryPassword";
import { FIRST_SIGN_IN_WORKER } from "./firstSignIn.constants";
import { BLOCKED_BY_ATTEMPTS_ERROR } from "./hookRejectionErrors.constants";
import {
  INVALID_CREDENTIALS_ERROR,
  NETWORK_ERROR,
} from "./mapSignInAuthError.constants";
import {
  captureThrowawayCredentials,
  mockThrowawayClient,
  rejectedSignIn,
  THROWAWAY_SIGN_IN_SUCCESS,
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

const emailWith = (password: string) => ({
  email: NORMALIZED_AUTH_EMAIL,
  password,
});

const verify = () =>
  verifyTemporaryPassword(FIRST_SIGN_IN_WORKER, INPUT);

describe("verifyTemporaryPassword", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockThrowawayClient();
  });

  it("signs in with the temporary password and discards the extra session", async () => {
    const credentialsOf = captureThrowawayCredentials();

    await expect(verify()).resolves.toEqual({
      error: null,
      passwordAlreadyUpdated: false,
    });

    expect(credentialsOf()).toEqual([
      emailWith(INPUT.currentPassword),
    ]);
    expect(recordFailedSignIn).not.toHaveBeenCalled();
  });

  it("records one failure when neither password works", async () => {
    const credentialsOf = captureThrowawayCredentials([
      rejectedSignIn(INVALID_CREDENTIALS_ERROR),
    ]);

    const result = await verify();

    expect(credentialsOf()).toEqual([
      emailWith(INPUT.currentPassword),
      emailWith(INPUT.newPassword),
    ]);
    expect(recordFailedSignIn).toHaveBeenCalledOnce();
    expect(recordFailedSignIn).toHaveBeenCalledWith(
      FIRST_SIGN_IN_WORKER.username
    );
    expect(result.error?.code).toBe(
      FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_INVALID
    );
  });

  it("recognises an update that already happened and records nothing", async () => {
    const credentialsOf = captureThrowawayCredentials([
      rejectedSignIn(INVALID_CREDENTIALS_ERROR),
      THROWAWAY_SIGN_IN_SUCCESS,
    ]);

    await expect(verify()).resolves.toEqual({
      error: null,
      passwordAlreadyUpdated: true,
    });

    expect(credentialsOf()).toHaveLength(2);
    expect(throwawaySignOut).toHaveBeenCalledOnce();
    expect(recordFailedSignIn).not.toHaveBeenCalled();
  });

  it.each([
    ["a block by attempts", BLOCKED_BY_ATTEMPTS_ERROR],
    ["a network error", NETWORK_ERROR],
  ])(
    "stops at %s on the temporary password without recording",
    async (_name, error) => {
      const credentialsOf = captureThrowawayCredentials([
        rejectedSignIn(error),
      ]);

      await expect(verify()).resolves.toMatchObject({
        error: expect.anything(),
      });
      expect(credentialsOf()).toHaveLength(1);
      expect(recordFailedSignIn).not.toHaveBeenCalled();
    }
  );

  it("does not record when the new password check fails for another reason", async () => {
    captureThrowawayCredentials([
      rejectedSignIn(INVALID_CREDENTIALS_ERROR),
      rejectedSignIn(NETWORK_ERROR),
    ]);

    const result = await verify();

    expect(result.error?.code).toBe(
      FIRST_SIGN_IN_ERROR_CODE.NETWORK
    );
    expect(recordFailedSignIn).not.toHaveBeenCalled();
  });

  it("rejects when the failure cannot be recorded", async () => {
    captureThrowawayCredentials([
      rejectedSignIn(INVALID_CREDENTIALS_ERROR),
    ]);
    vi.mocked(recordFailedSignIn).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(verify()).rejects.toThrow(
      RPC_FAILURE.message
    );
  });
});
