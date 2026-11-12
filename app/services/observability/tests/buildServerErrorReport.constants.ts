import {
  AuthApiError,
  PostgrestError,
} from "@supabase/supabase-js";
import {
  HTTP_STATUS,
  SUPABASE_AUTH_ERROR_CODE,
} from "@/app/constants";
import { SupabaseQueryError } from "@/app/utils/supabase-error/SupabaseError";

export const TEST_OPERATION = "test:operation";
export const FAILURE_MESSAGE = "service failure";
export const CUSTOM_ERROR_NAME = "CustomError";
export const POSTGREST_CODE = "PGRST301";
export const CAUSE_CODE = "CAUSE_CODE";
export const OWN_CODE = "OWN_CODE";
export const THROWN_TEXT = "thrown text";
export const NUMERIC_CODE = 42;

export const LEAKED_USERNAME = "operaciones1";
export const LEAKED_PASSWORD = "hunter2-secret-password";
export const LEAKED_MESSAGE = `user ${LEAKED_USERNAME} with password ${LEAKED_PASSWORD} failed`;

export const PLAIN_ERROR = new Error(FAILURE_MESSAGE);

export const NAMED_ERROR = Object.assign(
  new Error(FAILURE_MESSAGE),
  { name: CUSTOM_ERROR_NAME }
);

export const ERROR_WITH_CODE = Object.assign(
  new Error(FAILURE_MESSAGE),
  { code: OWN_CODE }
);

export const ERROR_WITH_CAUSE_CODE = new Error(
  FAILURE_MESSAGE,
  { cause: { code: CAUSE_CODE } }
);

export const ERROR_WITH_OWN_AND_CAUSE_CODE = Object.assign(
  new Error(FAILURE_MESSAGE, {
    cause: { code: CAUSE_CODE },
  }),
  { code: OWN_CODE }
);

export const ERROR_WITH_NUMERIC_CODE = Object.assign(
  new Error(FAILURE_MESSAGE),
  { code: NUMERIC_CODE }
);

export const SUPABASE_QUERY_ERROR = new SupabaseQueryError(
  TEST_OPERATION,
  new PostgrestError({
    code: POSTGREST_CODE,
    details: LEAKED_MESSAGE,
    hint: LEAKED_MESSAGE,
    message: LEAKED_MESSAGE,
  })
);

export const AUTH_API_ERROR = new AuthApiError(
  LEAKED_MESSAGE,
  HTTP_STATUS.BAD_REQUEST,
  SUPABASE_AUTH_ERROR_CODE.INVALID_CREDENTIALS
);

export const LEAKING_ERROR = Object.assign(
  new Error(LEAKED_MESSAGE, {
    cause: new Error(LEAKED_MESSAGE),
  }),
  { code: OWN_CODE }
);
