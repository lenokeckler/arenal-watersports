import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import "./verifyCurrentPassword.setup";
import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import { DEFAULT_PASSWORD_CHANGE_INPUT as INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";
import { NORMALIZED_AUTH_EMAIL } from "@/app/utils/sign-in/tests/signIn.constants";
import { isBlockedByAttempts } from "../isBlockedByAttempts";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { recordSuccessfulSignIn } from "../recordSuccessfulSignIn";
import { verifyCurrentPassword } from "../verifyCurrentPassword";
import { ALREADY_CHANGED_WORKER as WORKER } from "./firstSignIn.constants";
import { INVALID_CREDENTIALS_ERROR } from "./mapSignInAuthError.constants";
import {
  captureThrowawayCredentials,
  mockThrowawayClient,
  rejectedSignIn,
  throwawaySignOut,
} from "./mockThrowawayClient";
import { REQUEST_SUPABASE_CLIENT as SUPABASE } from "./requestSupabaseClient.constants";

const verify = () =>
  verifyCurrentPassword(
    SUPABASE,
    WORKER,
    INPUT.currentPassword
  );

describe("verifyCurrentPassword", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockThrowawayClient();
  });

  it("confirms the current password, discards the extra session and resets the streak", async () => {
    const credentialsOf = captureThrowawayCredentials();

    await expect(verify()).resolves.toBeNull();

    expect(credentialsOf()).toEqual([
      {
        email: NORMALIZED_AUTH_EMAIL,
        password: INPUT.currentPassword,
      },
    ]);
    expect(throwawaySignOut).toHaveBeenCalledOnce();
    expect(recordSuccessfulSignIn).toHaveBeenCalledOnce();
    expect(recordSuccessfulSignIn).toHaveBeenCalledWith(
      WORKER.id
    );
    expect(recordFailedSignIn).not.toHaveBeenCalled();
    expect(isBlockedByAttempts).not.toHaveBeenCalled();
  });

  it("records exactly one failure and never tries the new password", async () => {
    const credentialsOf = captureThrowawayCredentials([
      rejectedSignIn(INVALID_CREDENTIALS_ERROR),
    ]);
    vi.mocked(isBlockedByAttempts).mockResolvedValue(false);

    const result = await verify();

    expect(result?.code).toBe(
      PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID
    );
    expect(credentialsOf()).toHaveLength(1);
    expect(recordFailedSignIn).toHaveBeenCalledOnce();
    expect(recordFailedSignIn).toHaveBeenCalledWith(
      WORKER.username
    );
    expect(recordSuccessfulSignIn).not.toHaveBeenCalled();
  });

  it("reports the block when this very attempt blocked the account", async () => {
    captureThrowawayCredentials([
      rejectedSignIn(INVALID_CREDENTIALS_ERROR),
    ]);
    vi.mocked(isBlockedByAttempts).mockResolvedValue(true);

    const result = await verify();

    expect(result?.code).toBe(
      PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS
    );
    expect(isBlockedByAttempts).toHaveBeenCalledOnce();
    expect(isBlockedByAttempts).toHaveBeenCalledWith(
      SUPABASE,
      WORKER.id
    );
    expect(
      vi.mocked(recordFailedSignIn).mock
        .invocationCallOrder[0]
    ).toBeLessThan(
      vi.mocked(isBlockedByAttempts).mock
        .invocationCallOrder[0]
    );
  });
});
