import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { createSignInError } from "@/app/utils/sign-in/createSignInError";
import type { SignInCredentials } from "@/app/services/authentication";
import { DEFAULT_SIGN_IN_CREDENTIALS } from "@/app/utils/sign-in/tests/signIn.constants";

export const WRONG_PASSWORD_CREDENTIALS: SignInCredentials =
  {
    ...DEFAULT_SIGN_IN_CREDENTIALS,
    password: "Wrong-password1!",
  };

export const INVALID_CREDENTIALS_ERROR = createSignInError(
  SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
);

export const UNKNOWN_ERROR = createSignInError(
  SIGN_IN_ERROR_CODE.UNKNOWN
);

export const SERVICE_FAILURE_MESSAGE =
  "service unavailable";
export const REDIRECT_SIGNAL_MESSAGE = "NEXT_REDIRECT";
