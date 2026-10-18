export const E2E_AUTH_COOKIE_ENCODING = {
  BASE64_PREFIX: "base64-",
  BASE64_URL: "base64url",
  JOINED_CHUNKS_SEPARATOR: "",
  UTF8: "utf8",
} as const;

export const E2E_REFRESH_GRANT = {
  ACCESS_TOKEN_FIELD: "access_token",
  API_KEY_HEADER: "apikey",
  CONTENT_TYPE: "application/json",
  CONTENT_TYPE_HEADER: "Content-Type",
  ERROR_CODE_FIELD: "error_code",
  GRANT_TYPE: "refresh_token",
  GRANT_TYPE_PARAM: "grant_type",
  METHOD: "POST",
  REFRESH_TOKEN_FIELD: "refresh_token",
  PATH: "/auth/v1/token",
} as const;

export const E2E_REFRESH_GRANT_ERROR = {
  CLIENT_ERROR_MAX_STATUS: 499,
  CLIENT_ERROR_MIN_STATUS: 400,
  NO_REFRESH_TOKEN:
    "the auth cookies hold no refresh token",
  READ_OPERATION:
    "read the refresh token from the auth cookies",
} as const;

export const E2E_SIGNED_IN_SESSION_COUNT = 1;
