export const OUT_ON_WATER_ERROR = {
  ADJUST_DURATION:
    "adjust the duration of a dispatched group",
  INVALID_ADJUSTMENT:
    "The duration adjustment is not valid.",
  LOAD_GROUPS: "load the dispatched groups that are out",
} as const;

export const OUT_ON_WATER_TIME = {
  MINUTES_PER_HOUR: 60,
  MS_PER_MINUTE: 60_000,
  REFRESH_MS: 30_000,
} as const;

export const OUT_ON_WATER_DURATION = {
  MAX_MINUTES: 1440,
  MIN_MINUTES: 1,
} as const;

export const OUT_ON_WATER_DATABASE_ERROR = {
  ALREADY_CLOSED: "55000",
  INVALID_DURATION: "22023",
} as const;

export const ADJUST_DURATION_STATUS = {
  ADJUSTED: "adjusted",
  ALREADY_CLOSED: "already_closed",
  INVALID: "invalid",
} as const;

export const DURATION_ADJUST_DELTAS = [
  -15, 15, 30,
] as const;

export const DURATION_ADJUST_PATTERN = /^\d+$/;
