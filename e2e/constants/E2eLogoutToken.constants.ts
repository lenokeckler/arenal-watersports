export const E2E_AUTH_COOKIE_ENCODING = {
  BASE64_PREFIX: "base64-",
} as const;

export const E2E_REFRESH_TOKEN_ERROR = {
  NO_REFRESH_TOKEN:
    "the auth cookies hold no refresh token",
  NOT_BASE64: "the auth cookies are not base64 encoded",
  READ_OPERATION:
    "read the refresh token from the auth cookies",
} as const;

export const E2E_SIGNED_IN_SESSION_COUNT = 1;
