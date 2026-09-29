import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { createSignInError } from "@/app/services/authentication/createSignInError";
import type { SignInCredentials } from "@/app/services/authentication";

export const DEFAULT_SUBMIT_CREDENTIALS: SignInCredentials =
  {
    password: "Local-test-password1!",
    username: "admin",
  };

export const WRONG_PASSWORD_CREDENTIALS: SignInCredentials =
  {
    ...DEFAULT_SUBMIT_CREDENTIALS,
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
