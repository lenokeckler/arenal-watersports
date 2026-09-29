import {
  isAuthApiError,
  isAuthRetryableFetchError,
  type AuthError,
} from "@supabase/supabase-js";
import {
  HTTP_STATUS,
  SIGN_IN_ERROR_CODE,
  SUPABASE_AUTH_ERROR_CODE,
} from "@/app/constants";
import { createSignInError } from "./createSignInError";
import type { SignInError } from "./models/SignInError.interface";

export const mapSignInAuthError = (
  error: AuthError
): SignInError => {
  if (isAuthRetryableFetchError(error)) {
    return createSignInError(SIGN_IN_ERROR_CODE.NETWORK);
  }

  if (!isAuthApiError(error)) {
    return createSignInError(SIGN_IN_ERROR_CODE.UNKNOWN);
  }

  if (
    error.code ===
    SUPABASE_AUTH_ERROR_CODE.INVALID_CREDENTIALS
  ) {
    return createSignInError(
      SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
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
