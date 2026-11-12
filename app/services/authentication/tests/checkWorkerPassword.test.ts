import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SUPABASE_SIGN_OUT_SCOPE } from "@/app/constants";
import {
  NORMALIZED_AUTH_EMAIL,
  UNNORMALIZED_USERNAME,
} from "@/app/utils/sign-in/tests/signIn.constants";
import { SupabaseAuthOperationError } from "@/app/utils/supabase-error/SupabaseAuthError";
import { checkWorkerPassword } from "../checkWorkerPassword";
import {
  FIRST_SIGN_IN_WORKER,
  PADDED_TEMPORARY_PASSWORD,
  TEMPORARY_PASSWORD,
} from "./firstSignIn.constants";
import {
  BLOCKED_BY_ADMINISTRATION_ERROR,
  UNAVAILABLE_ERROR,
} from "./hookRejectionErrors.constants";
import { NETWORK_ERROR } from "./mapSignInAuthError.constants";
import {
  captureThrowawayCredentials,
  captureThrowawaySignOutOptions,
  mockThrowawayClient,
  throwawaySignInWithPassword,
  throwawaySignOut,
} from "./mockThrowawayClient";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);

const check = (
  username: string = FIRST_SIGN_IN_WORKER.username,
  password: string = TEMPORARY_PASSWORD
) => checkWorkerPassword(username, password);

describe("checkWorkerPassword", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockThrowawayClient();
  });

  it("signs in and discards the session only after the sign-in succeeded", async () => {
    const signOutOptionsOf =
      captureThrowawaySignOutOptions();

    await expect(check()).resolves.toBeNull();

    expect(signOutOptionsOf()).toEqual([
      { scope: SUPABASE_SIGN_OUT_SCOPE.LOCAL },
    ]);
    expect(
      throwawaySignInWithPassword.mock
        .invocationCallOrder[0]
    ).toBeLessThan(
      throwawaySignOut.mock.invocationCallOrder[0]
    );
  });

  it("builds the email from a username typed with spaces and capitals", async () => {
    const credentialsOf = captureThrowawayCredentials();

    await check(UNNORMALIZED_USERNAME);

    expect(credentialsOf()).toEqual([
      {
        email: NORMALIZED_AUTH_EMAIL,
        password: TEMPORARY_PASSWORD,
      },
    ]);
  });

  it("sends the password exactly as typed", async () => {
    const credentialsOf = captureThrowawayCredentials();

    await check(undefined, PADDED_TEMPORARY_PASSWORD);

    expect(credentialsOf()).toEqual([
      {
        email: NORMALIZED_AUTH_EMAIL,
        password: PADDED_TEMPORARY_PASSWORD,
      },
    ]);
  });

  it.each([
    [
      "a block by administration",
      BLOCKED_BY_ADMINISTRATION_ERROR,
    ],
    ["an unavailable account", UNAVAILABLE_ERROR],
    ["a network error", NETWORK_ERROR],
  ])(
    "returns the sign-in error for %s without signing out",
    async (_name, error) => {
      throwawaySignInWithPassword.mockResolvedValue({
        data: {},
        error,
      });

      await expect(check()).resolves.toBe(error);
      expect(throwawaySignOut).not.toHaveBeenCalled();
    }
  );

  it("propagates a sign-in that rejects without signing out", async () => {
    throwawaySignInWithPassword.mockRejectedValue(
      NETWORK_ERROR
    );

    await expect(check()).rejects.toBe(NETWORK_ERROR);
    expect(throwawaySignOut).not.toHaveBeenCalled();
  });

  it("rejects with a typed error that keeps the cause when the extra session cannot be discarded", async () => {
    throwawaySignOut.mockResolvedValue({
      error: NETWORK_ERROR,
    });

    const failure = await check().catch(
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
