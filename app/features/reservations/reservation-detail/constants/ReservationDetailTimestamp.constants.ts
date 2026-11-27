export const RESERVATION_DETAIL_TIMESTAMP_PATTERN =
  /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(?:\.(\d+))?(Z|[+-]\d{2}(?::?\d{2})?)$/;

export const RESERVATION_DETAIL_TIMESTAMP = {
  FRACTION_DIGITS: 6,
  FRACTION_PAD: "0",
  MINUTES_SUFFIX: ":00",
  MICROSECONDS_PER_MILLISECOND: 1000,
  SHORT_OFFSET_LENGTH: 3,
} as const;
