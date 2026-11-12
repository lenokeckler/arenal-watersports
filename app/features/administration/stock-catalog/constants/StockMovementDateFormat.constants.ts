export const STOCK_MOVEMENT_DATE_FORMAT = {
  LOCALE: "es-CR",
  OPTIONS: {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Costa_Rica",
  },
} as const satisfies {
  LOCALE: string;
  OPTIONS: Intl.DateTimeFormatOptions;
};
