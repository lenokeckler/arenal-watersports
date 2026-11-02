export const RESERVATION_SPLIT_FIELD_ID = {
  ALERT: "reservation-split-alert",
  HEADING: "reservation-split-heading",
  ITEMS_PREFIX: "reservation-split-items-",
  PEOPLE_PREFIX: "reservation-split-people-",
  HEADING_PREFIX: "reservation-split-heading-",
  ORIGINAL_HEADING: "reservation-split-heading-original",
  TIME_PREFIX: "reservation-split-time-",
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

export const RESERVATION_SPLIT_LIST_SEPARATOR = ", ";

export const RESERVATION_SPLIT_FOCUS = {
  SCROLL_BLOCK: "nearest",
  TAB_INDEX: -1,
} as const;
