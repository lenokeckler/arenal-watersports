export const DEFAULT_DURATION_MINUTES_MAX = 2147483647;

export const DEFAULT_LOW_FUEL_LINES = 1;

export const LOW_FUEL_LINES_DATABASE_ERROR = {
  TOO_HIGH_MESSAGE: "cannot exceed the lines of the gauge",
} as const;

export const LOW_FUEL_LINES_LIMITS = {
  MAX: 20,
  MIN: 1,
} as const;
