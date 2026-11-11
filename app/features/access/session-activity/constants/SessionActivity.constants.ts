export const SESSION_ACTIVITY = {
  COUNTDOWN_SECONDS_DIGITS: 2,
  COUNTDOWN_TICK_MS: 1_000,
  IGNORE_SELECTOR: "[data-session-activity-ignore]",
  MS_PER_SECOND: 1_000,
  REPORT_INTERVAL_MS: 60_000,
  SECONDS_PER_MINUTE: 60,
  WARNING_LEAD_SECONDS: 120,
} as const;

export const SESSION_ACTIVITY_EVENTS = [
  "pointerdown",
  "keydown",
] as const;

export const SESSION_ACTIVITY_IGNORE_PROPS = {
  "data-session-activity-ignore": "true",
} as const;
