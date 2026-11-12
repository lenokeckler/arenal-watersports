export const RESERVATION_POSTPONEMENT_LIMITS = {
  DECIMAL_COMMA: ",",
  DECIMAL_POINT: ".",
  MAX_REASON_LENGTH: 300,
  READING_PATTERN: /^\d+(\.\d{1,2})?$/,
  TIME_PATTERN: /^([01]\d|2[0-3]):[0-5]\d$/,
} as const;
