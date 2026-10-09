import {
  isAuthApiError,
  isAuthRetryableFetchError,
  type AuthError,
} from "@supabase/supabase-js";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PASSWORD_UPDATE_ERROR_CODE,
} from "@/app/constants";
import { createPasswordChangeError } from "@/app/utils/password-change/createPasswordChangeError";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";

export const mapPasswordUpdateError = (
  error: AuthError
): PasswordChangeError => {
  if (isAuthRetryableFetchError(error)) {
    return createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.NETWORK
    );
  }

  const code =
    isAuthApiError(error) && error.code
      ? PASSWORD_UPDATE_ERROR_CODE[error.code]
      : undefined;

  return createPasswordChangeError(
    code ?? PASSWORD_CHANGE_ERROR_CODE.UNKNOWN
  );
};
