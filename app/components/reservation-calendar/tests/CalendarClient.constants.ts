export const CALENDAR_CLIENT_TEST = {
  CHANNEL: "calendar-test",
  REFRESHES_AFTER_RECONNECT: 2,
  REDIRECT_DIGEST:
    "NEXT_REDIRECT;replace;/access/login;307;",
  BURST_COUNT: 3,
} as const;
