import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { recordSuccessfulSignIn } from "../recordSuccessfulSignIn";
import { signInWithUsername } from "../signInWithUsername";
import { BLOCKED_BY_ATTEMPTS_ERROR } from "./hookRejectionErrors.constants";
import {
  INVALID_CREDENTIALS_ERROR,
  NETWORK_ERROR,
  RATE_LIMIT_BY_CODE_ERROR,
} from "./mapSignInAuthError.constants";
import {
  mockSignInClient,
  signInWithPassword,
} from "./mockSignInClient";
import {
  OTHER_USERNAME,
  SIGNED_IN_USER_ID,
} from "./recordSignIn.constants";

vi.mock("@/app/services/supabase", () => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("../recordFailedSignIn", () => ({
  recordFailedSignIn: vi.fn(),
}));

vi.mock("../recordSuccessfulSignIn", () => ({
  recordSuccessfulSignIn: vi.fn(),
}));

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
    ["a hook rejection", BLOCKED_BY_ATTEMPTS_ERROR],
    ["a network error", NETWORK_ERROR],
    ["a rate limit", RATE_LIMIT_BY_CODE_ERROR],
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

  it("records the success with the signed-in user id", async () => {
    await signInWithUsername(DEFAULT_SIGN_IN_CREDENTIALS);

    expect(recordSuccessfulSignIn).toHaveBeenCalledOnce();
    expect(recordSuccessfulSignIn).toHaveBeenCalledWith(
      SIGNED_IN_USER_ID
    );
    expect(recordFailedSignIn).not.toHaveBeenCalled();
  });
});
