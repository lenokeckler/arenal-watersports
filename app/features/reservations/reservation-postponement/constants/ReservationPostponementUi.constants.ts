export const RESERVATION_POSTPONEMENT_FIELD_ID = {
  HEADING: "reservation-postponement-heading",
  SUMMARY_HEADING:
    "reservation-postponement-summary-heading",
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
