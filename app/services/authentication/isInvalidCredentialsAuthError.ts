import {
  isAuthApiError,
  type AuthError,
} from "@supabase/supabase-js";
import { SUPABASE_AUTH_ERROR_CODE } from "@/app/constants";

export const isInvalidCredentialsAuthError = (
  error: AuthError
): boolean =>
  isAuthApiError(error) &&
  error.code ===
    SUPABASE_AUTH_ERROR_CODE.INVALID_CREDENTIALS;
