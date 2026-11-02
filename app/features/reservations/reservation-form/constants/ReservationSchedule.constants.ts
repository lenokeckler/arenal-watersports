export const RESERVATION_SCHEDULE = {
  DATE_PATTERN: /^(\d{4})-(\d{2})-(\d{2})$/,
  DAYS_PER_MONTH_MAX: 31,
  FIRST_DAY: 1,
  FIRST_MONTH: 1,
  FIRST_YEAR: 1,
  LAST_HOUR: 23,
  LAST_MINUTE: 59,
  MINUTES_PER_HOUR: 60,
  MONTHS_PER_YEAR: 12,
  TIME_PATTERN: /^(\d{2}):(\d{2})$/,
} as const;
