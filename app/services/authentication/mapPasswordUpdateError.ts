import {
  isAuthApiError,
  isAuthRetryableFetchError,
  type AuthError,
} from "@supabase/supabase-js";
import {
  FIRST_SIGN_IN_ERROR_CODE,
  SUPABASE_AUTH_ERROR_CODE,
  type FirstSignInErrorCode,
} from "@/app/constants";
import { createFirstSignInError } from "@/app/utils/first-sign-in/createFirstSignInError";
import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";

const PASSWORD_UPDATE_ERROR_CODE: Partial<
  Record<string, FirstSignInErrorCode>
> = {
  [SUPABASE_AUTH_ERROR_CODE.OVER_REQUEST_RATE_LIMIT]:
    FIRST_SIGN_IN_ERROR_CODE.TOO_MANY_REQUESTS,
  [SUPABASE_AUTH_ERROR_CODE.SAME_PASSWORD]:
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT,
  [SUPABASE_AUTH_ERROR_CODE.VALIDATION_FAILED]:
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_TOO_LONG,
  [SUPABASE_AUTH_ERROR_CODE.WEAK_PASSWORD]:
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES,
};

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
