import {
  isAuthApiError,
  type AuthError,
} from "@supabase/supabase-js";
import {
  HTTP_STATUS,
  SIGN_IN_HOOK_REJECTION,
  SUPABASE_AUTH_ERROR_CODE,
  type SignInHookRejection,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

export const resolveHookRejection = (
  error: AuthError
): NullableRef<SignInHookRejection> => {
  if (
    !isAuthApiError(error) ||
    error.status !== HTTP_STATUS.FORBIDDEN ||
    error.code !== SUPABASE_AUTH_ERROR_CODE.HOOK_REJECTION
  ) {
    return null;
  }

  return (
    Object.values(SIGN_IN_HOOK_REJECTION).find(
      (rejection) => rejection === error.message
    ) ?? null
  );
};
