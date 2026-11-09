export const RESERVATION_SPLIT_FIELD_ID = {
  ORIGINAL_HEADING: "reservation-split-heading-original",
} as const;

export const RESERVATION_SPLIT_DATE_FORMAT = {
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

export const RESERVATION_SPLIT_MINUTES_PER_HOUR = 60;
