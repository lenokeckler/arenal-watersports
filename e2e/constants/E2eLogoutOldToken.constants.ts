export const E2E_ACCESS_TOKEN = {
  MS_PER_SECOND: 1000,
  PAYLOAD_INDEX: 1,
  SEPARATOR: ".",
} as const;

export const E2E_ACCESS_TOKEN_ERROR = {
  MISSING: "the auth cookies hold no access token",
  NO_EXPIRY: "the access token carries no expiry",
  READ_OPERATION:
    "read the access token expiry from the auth cookies",
} as const;
