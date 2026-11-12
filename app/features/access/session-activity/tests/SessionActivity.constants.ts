export const REPORT_FIXTURE = {
  ERROR_MESSAGE: "network down",
  UNKNOWN_ANSWER: "revoked",
} as const;

export const TRACKER_FIXTURE = {
  START_MS: 1_800_000_000_000,
  JUST_BEFORE_INTERVAL_MS: 59_999,
  OTHER_EVENT: "scroll",
} as const;

export const CLOCK_FIXTURE = {
  DAY_SECONDS_LEFT: 36_000,
  NIGHT_SECONDS_LEFT: 1_800,
  WARNING_SECONDS_LEFT: 90,
  SKEWED_SECONDS_LEFT: 3,
  TEXT_ANSWER: "1800",
  ONE_TICK_LATER: 89,
} as const;

export const COUNTDOWN_CASES: [number, string][] = [
  [120, "2:00"],
  [119, "1:59"],
  [61, "1:01"],
  [9, "0:09"],
  [0, "0:00"],
];

export const WARNING_FIXTURE = {
  ARIA_DISABLED_ATTRIBUTE: "aria-disabled",
  ARIA_DISABLED_TRUE: "true",
  SECONDS_LEFT: 119,
  SHOWN_COUNTDOWN: "1:59",
} as const;
