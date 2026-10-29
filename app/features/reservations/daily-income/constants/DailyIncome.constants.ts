export const DAILY_INCOME_BAR = {
  MAX_PERCENT: 100,
  MIN_PERCENT: 3,
  VIEWBOX: "0 0 100 1",
  VIEWBOX_HEIGHT: 1,
} as const;

export const DAILY_INCOME_DATE_FORMAT = {
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

export const DAILY_INCOME_ID = {
  BREAKDOWN_SUFFIX: "-breakdown",
  PREFIX: "daily-income-",
  TITLE_SUFFIX: "-title",
} as const;

export const DAILY_INCOME_SKELETON = {
  CARD_COUNT: 2,
  ROW_COUNT: 3,
} as const;

export const SVG_PRESERVE_ASPECT_RATIO_NONE = "none";
