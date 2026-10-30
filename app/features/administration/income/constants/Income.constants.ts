export const INCOME_SIGN_GLYPH = "−";

export const INCOME_DATE_FORMAT = {
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

export const INCOME_ID = {
  PREFIX: "income-",
  TITLE_SUFFIX: "-title",
} as const;

export const INCOME_SKELETON = {
  CARD_COUNT: 2,
  ROW_COUNT: 2,
} as const;
