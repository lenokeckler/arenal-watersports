export const RESERVATION_POSTPONEMENT_FIELD_ID = {
  ALERT: "reservation-postponement-alert",
  CAUSE: "reservation-postponement-cause",
  DATE: "reservation-postponement-date",
  HEADING: "reservation-postponement-heading",
  REASON: "reservation-postponement-reason",
  SUMMARY_HEADING:
    "reservation-postponement-summary-heading",
  TIME: "reservation-postponement-time",
} as const;

export const RESERVATION_POSTPONEMENT_FOCUS = {
  TAB_INDEX: -1,
} as const;

export const RESERVATION_POSTPONEMENT_DATE_FORMAT = {
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
