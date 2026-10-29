import {
  AuthApiError,
  AuthRetryableFetchError,
} from "@supabase/supabase-js";
import {
  HTTP_STATUS,
  SUPABASE_AUTH_ERROR_CODE,
} from "@/app/constants";

const AUTH_ERROR_MESSAGE = "auth error";
const NO_RESPONSE_STATUS = 0;

export const INVALID_CREDENTIALS_ERROR = new AuthApiError(
  AUTH_ERROR_MESSAGE,
  HTTP_STATUS.BAD_REQUEST,
  SUPABASE_AUTH_ERROR_CODE.INVALID_CREDENTIALS
);

export const RATE_LIMIT_BY_CODE_ERROR = new AuthApiError(
  AUTH_ERROR_MESSAGE,
  HTTP_STATUS.BAD_REQUEST,
  SUPABASE_AUTH_ERROR_CODE.OVER_REQUEST_RATE_LIMIT
);

export const RATE_LIMIT_BY_STATUS_ERROR = new AuthApiError(
  AUTH_ERROR_MESSAGE,
  HTTP_STATUS.TOO_MANY_REQUESTS,
  undefined
);

export const NETWORK_ERROR = new AuthRetryableFetchError(
  AUTH_ERROR_MESSAGE,
  NO_RESPONSE_STATUS
);

export const SERVER_ERROR = new AuthApiError(
  AUTH_ERROR_MESSAGE,
  HTTP_STATUS.INTERNAL_SERVER_ERROR,
  undefined
);
