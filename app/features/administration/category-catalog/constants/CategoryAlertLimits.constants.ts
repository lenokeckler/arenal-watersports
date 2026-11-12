const INT4_MAX = 2147483647;

export const CATEGORY_ALERT_LIMITS = {
  MAX: INT4_MAX,
  MIN: 1,
} as const;

export const CATEGORY_ALERT_INTEGER_PATTERN = /^-?\d+$/;
