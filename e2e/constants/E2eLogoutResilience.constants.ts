export const E2E_LOGOUT_ENDPOINT = {
  ROUTE_PATTERN: "**/auth/v1/logout**",
  URL_FRAGMENT: "/auth/v1/logout",
} as const;

export const E2E_LOGOUT_REQUEST_COUNT = {
  SINGLE: 1,
} as const;

export const E2E_LOGOUT_SERVER_FAILURE_SESSIONS = {
  STILL_ON_SERVER: 1,
} as const;
