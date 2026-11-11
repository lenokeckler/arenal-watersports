export const UNIT_DECOMMISSION_DATE_FORMAT = {
  LOCALE: "es-CR",
  OPTIONS: {
    day: "numeric",
    month: "long",
    timeZone: "America/Costa_Rica",
    year: "numeric",
  },
} as const satisfies {
  LOCALE: string;
  OPTIONS: Intl.DateTimeFormatOptions;
};
