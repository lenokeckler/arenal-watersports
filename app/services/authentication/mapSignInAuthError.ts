import {
  isAuthApiError,
  isAuthRetryableFetchError,
  type AuthError,
} from "@supabase/supabase-js";
import {
  HTTP_STATUS,
  SIGN_IN_ERROR_CODE,
  SIGN_IN_HOOK_REJECTION_ERROR_CODE,
  SUPABASE_AUTH_ERROR_CODE,
} from "@/app/constants";
import { createSignInError } from "@/app/utils/sign-in/createSignInError";
import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import { isInvalidCredentialsAuthError } from "./isInvalidCredentialsAuthError";
import { resolveHookRejection } from "./resolveHookRejection";

export const mapSignInAuthError = (
  error: AuthError
): SignInError => {
  if (isAuthRetryableFetchError(error)) {
    return createSignInError(SIGN_IN_ERROR_CODE.NETWORK);
  }

  if (!isAuthApiError(error)) {
    return createSignInError(SIGN_IN_ERROR_CODE.UNKNOWN);
  }

  if (isInvalidCredentialsAuthError(error)) {
    return createSignInError(
      SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
    );
  }

  const rejection = resolveHookRejection(error);

  if (rejection) {
    return createSignInError(
      SIGN_IN_HOOK_REJECTION_ERROR_CODE[rejection]
    );
  }

  if (
    error.code ===
      SUPABASE_AUTH_ERROR_CODE.OVER_REQUEST_RATE_LIMIT ||
    error.status === HTTP_STATUS.TOO_MANY_REQUESTS
  ) {
    return createSignInError(
      SIGN_IN_ERROR_CODE.TOO_MANY_REQUESTS
    );
  }

  return createSignInError(SIGN_IN_ERROR_CODE.UNKNOWN);
};
