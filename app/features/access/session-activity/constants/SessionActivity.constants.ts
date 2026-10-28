export const SESSION_ACTIVITY = {
  COUNTDOWN_TICK_MS: 1_000,
  MS_PER_SECOND: 1_000,
  REPORT_INTERVAL_MS: 60_000,
  WARNING_LEAD_SECONDS: 120,
} as const;

export const SESSION_ACTIVITY_EVENTS = [
  "pointerdown",
  "keydown",
] as const;
