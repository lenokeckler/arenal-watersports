import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_FIELD,
} from "@/app/constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { recordSuccessfulSignIn } from "../recordSuccessfulSignIn";
import { signInWithUsername } from "../signInWithUsername";
import {
  BLOCKED_BY_ADMINISTRATION_ERROR,
  BLOCKED_BY_ATTEMPTS_ERROR,
  RECOVERY_REQUIRED_ERROR,
  TOKEN_WITH_WRONG_CODE_ERROR,
  TOKEN_WITH_WRONG_STATUS_ERROR,
  UNAVAILABLE_ERROR,
  UNKNOWN_TOKEN_ERROR,
} from "./hookRejectionErrors.constants";
import {
  INVALID_CREDENTIALS_ERROR,
  NETWORK_ERROR,
  NON_API_ERROR,
  NON_API_ERROR_WITH_INVALID_CREDENTIALS_CODE,
  RATE_LIMIT_BY_CODE_ERROR,
  RATE_LIMIT_BY_STATUS_ERROR,
  SERVER_ERROR,
} from "./mapSignInAuthError.constants";
import {
  mockSignInClient,
  signInWithPassword,
} from "./mockSignInClient";
import {
  OTHER_USERNAME,
  SIGNED_IN_USER_ID,
} from "./recordSignIn.constants";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);

vi.mock(
  "../recordFailedSignIn",
  () => import("./mocks/recordFailedSignIn.mock")
);

vi.mock(
  "../recordSuccessfulSignIn",
  () => import("./mocks/recordSuccessfulSignIn.mock")
);

describe("signInWithUsername recording", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockSignInClient();
  });

  it.each([
    DEFAULT_SIGN_IN_CREDENTIALS.username,
    OTHER_USERNAME,
  ])(
    "records one failure and answers the same for %s",
    async (username) => {
      signInWithPassword.mockResolvedValue({
        data: { user: null },
        error: INVALID_CREDENTIALS_ERROR,
      });

      const result = await signInWithUsername({
        ...DEFAULT_SIGN_IN_CREDENTIALS,
        username,
      });

      expect(recordFailedSignIn).toHaveBeenCalledOnce();
      expect(recordFailedSignIn).toHaveBeenCalledWith(
        username
      );
      expect(result).toEqual({
        ok: false,
        error: expect.objectContaining({
          code: SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS,
        }),
      });
    }
  );

  it.each([
    ["a block by attempts", BLOCKED_BY_ATTEMPTS_ERROR],
    [
      "a block by administration",
      BLOCKED_BY_ADMINISTRATION_ERROR,
    ],
    [
      "a recovery required rejection",
      RECOVERY_REQUIRED_ERROR,
    ],
    ["an unavailable account", UNAVAILABLE_ERROR],
    ["an unknown hook token", UNKNOWN_TOKEN_ERROR],
    [
      "a hook token with the wrong status",
      TOKEN_WITH_WRONG_STATUS_ERROR,
    ],
    [
      "a hook token with the wrong code",
      TOKEN_WITH_WRONG_CODE_ERROR,
    ],
    ["a network error", NETWORK_ERROR],
    ["a rate limit by code", RATE_LIMIT_BY_CODE_ERROR],
    ["a rate limit by status", RATE_LIMIT_BY_STATUS_ERROR],
    ["a server error", SERVER_ERROR],
    ["an unclassified error", NON_API_ERROR],
    [
      "a non-API error carrying the invalid credentials code",
      NON_API_ERROR_WITH_INVALID_CREDENTIALS_CODE,
    ],
  ])(
    "does not record a failure for %s",
    async (_name, error) => {
      signInWithPassword.mockResolvedValue({
        data: { user: null },
        error,
      });

      await signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS);

      expect(recordFailedSignIn).not.toHaveBeenCalled();
      expect(recordSuccessfulSignIn).not.toHaveBeenCalled();
    }
  );

  it("returns the account message of a hook rejection", async () => {
    signInWithPassword.mockResolvedValue({
      data: { user: null },
      error: BLOCKED_BY_ATTEMPTS_ERROR,
    });

    const result = await signInWithUsername(
      DEFAULT_SIGN_IN_CREDENTIALS
    );

    expect(result).toEqual({
      ok: false,
      error: expect.objectContaining({
        code: SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS,
      }),
    });
  });

  it("returns the recovery required error without recording a failure", async () => {
    signInWithPassword.mockResolvedValue({
      data: { user: null },
      error: RECOVERY_REQUIRED_ERROR,
    });

    const result = await signInWithUsername(
      DEFAULT_SIGN_IN_CREDENTIALS
    );

    expect(result).toEqual({
      ok: false,
      error: {
        code: SIGN_IN_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED,
        field: SIGN_IN_FIELD.FORM,
      },
    });
    expect(recordFailedSignIn).not.toHaveBeenCalled();
  });

  it("records the success with the signed-in user id", async () => {
    await signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS);

    expect(recordSuccessfulSignIn).toHaveBeenCalledOnce();
    expect(recordSuccessfulSignIn).toHaveBeenCalledWith(
      SIGNED_IN_USER_ID
    );
    expect(recordFailedSignIn).not.toHaveBeenCalled();
  });
});
