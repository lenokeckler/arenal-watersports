const LOGOUT_PATH = "/auth/v1/logout";

export const E2E_LOGOUT_ENDPOINT = {
  ROUTE_PATTERN: `**${LOGOUT_PATH}**`,
  URL_FRAGMENT: LOGOUT_PATH,
} as const;

export const E2E_LOGOUT_REQUEST_COUNT = {
  SINGLE: 1,
} as const;

export const E2E_LOGOUT_SERVER_FAILURE_SESSIONS = {
  STILL_ON_SERVER: 1,
} as const;
