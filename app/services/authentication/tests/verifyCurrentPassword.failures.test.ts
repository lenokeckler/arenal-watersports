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
import { isBlockedByAttempts } from "../isBlockedByAttempts";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { recordSuccessfulSignIn } from "../recordSuccessfulSignIn";
import { verifyCurrentPassword } from "../verifyCurrentPassword";
import { ALREADY_CHANGED_WORKER as WORKER } from "./firstSignIn.constants";
import {
  BLOCKED_BY_ADMINISTRATION_ERROR,
  BLOCKED_BY_ATTEMPTS_ERROR,
} from "./hookRejectionErrors.constants";
import {
  INVALID_CREDENTIALS_ERROR,
  NETWORK_ERROR,
  RATE_LIMIT_BY_CODE_ERROR,
} from "./mapSignInAuthError.constants";
import {
  captureThrowawayCredentials,
  mockThrowawayClient,
  rejectedSignIn,
} from "./mockThrowawayClient";
import { RPC_FAILURE } from "./recordSignIn.constants";

const verify = () =>
  verifyCurrentPassword(WORKER, INPUT.currentPassword);

describe("verifyCurrentPassword failures", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockThrowawayClient();
  });

  it.each([
    [
      "a block by attempts",
      BLOCKED_BY_ATTEMPTS_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
    ],
    [
      "a block by administration",
      BLOCKED_BY_ADMINISTRATION_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION,
    ],
    [
      "a network error",
      NETWORK_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.NETWORK,
    ],
    [
      "a rate limit",
      RATE_LIMIT_BY_CODE_ERROR,
      PASSWORD_CHANGE_ERROR_CODE.TOO_MANY_REQUESTS,
    ],
  ])(
    "maps %s without counting an attempt",
    async (_name, error, code) => {
      const credentialsOf = captureThrowawayCredentials([
        rejectedSignIn(error),
      ]);

      const result = await verify();

      expect(result?.code).toBe(code);
      expect(credentialsOf()).toHaveLength(1);
      expect(recordFailedSignIn).not.toHaveBeenCalled();
      expect(recordSuccessfulSignIn).not.toHaveBeenCalled();
      expect(isBlockedByAttempts).not.toHaveBeenCalled();
    }
  );

  it.each([
    ["recording the failure", recordFailedSignIn],
    ["reading the block state", isBlockedByAttempts],
  ])("rejects when %s fails", async (_name, step) => {
    captureThrowawayCredentials([
      rejectedSignIn(INVALID_CREDENTIALS_ERROR),
    ]);
    vi.mocked(step).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(verify()).rejects.toThrow(
      RPC_FAILURE.message
    );
  });

  it("rejects when the streak cannot be reset", async () => {
    captureThrowawayCredentials();
    vi.mocked(recordSuccessfulSignIn).mockRejectedValue(
      new Error(RPC_FAILURE.message)
    );

    await expect(verify()).rejects.toThrow(
      RPC_FAILURE.message
    );
  });
});
