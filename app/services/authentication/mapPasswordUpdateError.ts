import {
  isAuthApiError,
  isAuthRetryableFetchError,
  type AuthError,
} from "@supabase/supabase-js";
import {
  FIRST_SIGN_IN_ERROR_CODE,
  PASSWORD_UPDATE_ERROR_CODE,
} from "@/app/constants";
import { createFirstSignInError } from "@/app/utils/first-sign-in/createFirstSignInError";
import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";

export const mapPasswordUpdateError = (
  error: AuthError
): FirstSignInError => {
  if (isAuthRetryableFetchError(error)) {
    return createFirstSignInError(
      FIRST_SIGN_IN_ERROR_CODE.NETWORK
    );
  }

  const code =
    isAuthApiError(error) && error.code
      ? PASSWORD_UPDATE_ERROR_CODE[error.code]
      : undefined;

  return createFirstSignInError(
    code ?? FIRST_SIGN_IN_ERROR_CODE.UNKNOWN
  );
};
