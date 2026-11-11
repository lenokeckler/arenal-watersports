import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { recordFailedSignIn } from "../recordFailedSignIn";
import { signInWithUsername } from "../signInWithUsername";
import {
  mockSignInClient,
  signInWithPassword,
} from "./mockSignInClient";
import { INVALID_CREDENTIALS_ERROR } from "./mapSignInAuthError.constants";
import {
  BLANK_USERNAME,
  DEFAULT_SIGN_IN_CREDENTIALS,
  NORMALIZED_AUTH_EMAIL,
  UNNORMALIZED_USERNAME,
} from "@/app/utils/sign-in/tests/signIn.constants";

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

describe("signInWithUsername", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignInClient();
  });

  it("sends the normalized auth email and the untouched password", async () => {
    const credentials = {
      ...DEFAULT_SIGN_IN_CREDENTIALS,
      username: UNNORMALIZED_USERNAME,
    };

    await signInWithUsername(credentials);

    expect(signInWithPassword).toHaveBeenCalledWith({
      email: NORMALIZED_AUTH_EMAIL,
      password: credentials.password,
    });
  });

  it("returns ok when Supabase accepts the credentials", async () => {
    const result = await signInWithUsername(
      DEFAULT_SIGN_IN_CREDENTIALS
    );

    expect(result).toEqual({
      ok: true,
      mustChangePassword: false,
    });
  });

  it("returns the mapped error when Supabase rejects the credentials", async () => {
    signInWithPassword.mockResolvedValue({
      error: INVALID_CREDENTIALS_ERROR,
    });

    const result = await signInWithUsername(
      DEFAULT_SIGN_IN_CREDENTIALS
    );

    expect(result).toEqual({
      ok: false,
      error: expect.objectContaining({
        code: SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS,
      }),
    });
  });

  it("never reaches Supabase on invalid input", async () => {
    const result = await signInWithUsername({
      ...DEFAULT_SIGN_IN_CREDENTIALS,
      username: BLANK_USERNAME,
    });

    expect(result).toEqual({
      ok: false,
      error: expect.objectContaining({
        code: SIGN_IN_ERROR_CODE.USERNAME_REQUIRED,
      }),
    });
    expect(
      createServerSupabaseClient
    ).not.toHaveBeenCalled();
    expect(recordFailedSignIn).not.toHaveBeenCalled();
  });
});
