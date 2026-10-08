import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import {
  NORMALIZED_AUTH_EMAIL,
  UNNORMALIZED_USERNAME,
} from "@/app/utils/sign-in/tests/signIn.constants";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { verifyTemporaryPassword } from "../verifyTemporaryPassword";
import {
  FIRST_SIGN_IN_WORKER,
  PADDED_TEMPORARY_PASSWORD,
  TEMPORARY_PASSWORD,
} from "./firstSignIn.constants";
import {
  BLOCKED_BY_ADMINISTRATION_ERROR,
  UNAVAILABLE_ERROR,
} from "./hookRejectionErrors.constants";
import {
  NON_API_ERROR_WITH_INVALID_CREDENTIALS_CODE,
  NETWORK_ERROR,
} from "./mapSignInAuthError.constants";
import {
  mockThrowawayClient,
  throwawaySignInWithPassword,
  throwawaySignOut,
} from "./mockThrowawayClient";

vi.mock(
  "@/app/services/supabase",
  () => import("./mocks/supabaseServices.mock")
);

vi.mock(
  "../recordFailedSignIn",
  () => import("./mocks/recordFailedSignIn.mock")
);

const captureCredentials = (): (() => unknown) => {
  let captured: unknown;
  throwawaySignInWithPassword.mockImplementation(
    (credentials: unknown) => {
      captured = credentials;
      return Promise.resolve({ data: {}, error: null });
    }
  );

  return () => captured;
};

describe("verifyTemporaryPassword boundaries", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockThrowawayClient();
  });

  it("builds the email from a username typed with spaces and capitals", async () => {
    const credentialsOf = captureCredentials();

    await verifyTemporaryPassword(
      {
        ...FIRST_SIGN_IN_WORKER,
        username: UNNORMALIZED_USERNAME,
      },
      TEMPORARY_PASSWORD
    );

    expect(credentialsOf()).toEqual({
      email: NORMALIZED_AUTH_EMAIL,
      password: TEMPORARY_PASSWORD,
    });
  });

  it("sends the password exactly as typed", async () => {
    const credentialsOf = captureCredentials();

    await verifyTemporaryPassword(
      FIRST_SIGN_IN_WORKER,
      PADDED_TEMPORARY_PASSWORD
    );

    expect(credentialsOf()).toEqual({
      email: NORMALIZED_AUTH_EMAIL,
      password: PADDED_TEMPORARY_PASSWORD,
    });
  });

  it("discards the session only after the sign-in succeeded", async () => {
    await verifyTemporaryPassword(
      FIRST_SIGN_IN_WORKER,
      TEMPORARY_PASSWORD
    );

    expect(
      throwawaySignInWithPassword.mock
        .invocationCallOrder[0]
    ).toBeLessThan(
      throwawaySignOut.mock.invocationCallOrder[0]
    );
  });

  it.each([
    [
      "a block by administration",
      BLOCKED_BY_ADMINISTRATION_ERROR,
    ],
    ["an unavailable account", UNAVAILABLE_ERROR],
    [
      "an invalid credentials code on a non API error",
      NON_API_ERROR_WITH_INVALID_CREDENTIALS_CODE,
    ],
  ])(
    "does not record a failure for %s",
    async (_name, error) => {
      throwawaySignInWithPassword.mockResolvedValue({
        data: {},
        error,
      });

      await verifyTemporaryPassword(
        FIRST_SIGN_IN_WORKER,
        TEMPORARY_PASSWORD
      );

      expect(recordFailedSignIn).not.toHaveBeenCalled();
      expect(throwawaySignOut).not.toHaveBeenCalled();
    }
  );

  it("propagates a sign-in that rejects without recording or signing out", async () => {
    throwawaySignInWithPassword.mockRejectedValue(
      NETWORK_ERROR
    );

    await expect(
      verifyTemporaryPassword(
        FIRST_SIGN_IN_WORKER,
        TEMPORARY_PASSWORD
      )
    ).rejects.toBe(NETWORK_ERROR);

    expect(recordFailedSignIn).not.toHaveBeenCalled();
    expect(throwawaySignOut).not.toHaveBeenCalled();
  });
});
