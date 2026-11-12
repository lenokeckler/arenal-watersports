export const RESERVATION_CANCELLATION_FIELD_ID = {
  ALERT: "reservation-cancellation-alert",
  CAUSE: "reservation-cancellation-cause",
  CAUSE_ERROR: "reservation-cancellation-cause-error",
  CAUSE_HELPER: "reservation-cancellation-cause-helper",
  HEADING: "reservation-cancellation-heading",
  REASON: "reservation-cancellation-reason",
  SUMMARY_HEADING:
    "reservation-cancellation-summary-heading",
} as const;

export const RESERVATION_CANCELLATION_FOCUS = {
  TAB_INDEX: -1,
} as const;

export const RESERVATION_CANCELLATION_DATE_FORMAT = {
  LOCALE: "es-CR",
  NOON_UTC_TIME: "T12:00:00Z",
  OPTIONS: {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
  },
} as const satisfies {
  LOCALE: string;
  NOON_UTC_TIME: string;
  OPTIONS: Intl.DateTimeFormatOptions;
};
