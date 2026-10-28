import { AuthApiError } from "@supabase/supabase-js";
import {
  HTTP_STATUS,
  SIGN_IN_HOOK_REJECTION,
  SUPABASE_AUTH_ERROR_CODE,
} from "@/app/constants";

const UNRELATED_AUTH_ERROR_CODE = "validation_failed";

const createHookRejectionError = (
  message: string,
  status: number = HTTP_STATUS.FORBIDDEN,
  code: string = SUPABASE_AUTH_ERROR_CODE.HOOK_REJECTION
): AuthApiError => new AuthApiError(message, status, code);

export const BLOCKED_BY_ATTEMPTS_ERROR =
  createHookRejectionError(
    SIGN_IN_HOOK_REJECTION.BLOCKED_BY_ATTEMPTS
  );

export const BLOCKED_BY_ADMINISTRATION_ERROR =
  createHookRejectionError(
    SIGN_IN_HOOK_REJECTION.BLOCKED_BY_ADMINISTRATION
  );

export const UNAVAILABLE_ERROR = createHookRejectionError(
  SIGN_IN_HOOK_REJECTION.UNAVAILABLE
);

export const UNKNOWN_TOKEN_MESSAGE =
  "account_blocked:other";

export const UNKNOWN_TOKEN_ERROR = createHookRejectionError(
  UNKNOWN_TOKEN_MESSAGE
);

export const WRAPPED_TOKEN_ERROR = createHookRejectionError(
  `prefix ${SIGN_IN_HOOK_REJECTION.BLOCKED_BY_ATTEMPTS} suffix`
);

export const TOKEN_WITH_WRONG_STATUS_ERROR =
  createHookRejectionError(
    SIGN_IN_HOOK_REJECTION.BLOCKED_BY_ATTEMPTS,
    HTTP_STATUS.BAD_REQUEST
  );

export const TOKEN_WITH_WRONG_CODE_ERROR =
  createHookRejectionError(
    SIGN_IN_HOOK_REJECTION.BLOCKED_BY_ATTEMPTS,
    HTTP_STATUS.FORBIDDEN,
    UNRELATED_AUTH_ERROR_CODE
  );
