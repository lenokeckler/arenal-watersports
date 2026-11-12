export const WORKER_EXPIRY = {
  DATE_PATTERN: /^\d{4}-\d{2}-\d{2}$/,
  END_OF_DAY_SUFFIX: "T23:59:59-06:00",
  LOCALE: "es-CR",
  MILLISECONDS_PER_DAY: 86_400_000,
  MONTH_INDEX_OFFSET: 1,
  TIME_ZONE: "America/Costa_Rica",
  WARNING_DAYS: 7,
} as const;

export const WORKER_EXPIRY_STATUS = {
  EXPIRED: "expired",
  EXPIRING: "expiring",
  NONE: "none",
  VALID: "valid",
} as const;

export type WorkerExpiryStatus =
  (typeof WORKER_EXPIRY_STATUS)[keyof typeof WORKER_EXPIRY_STATUS];
