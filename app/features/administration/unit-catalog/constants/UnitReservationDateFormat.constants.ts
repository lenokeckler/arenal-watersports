export const UNIT_RESERVATION_DATE_FORMAT = {
  LOCALE: "es-CR",
  OPTIONS: {
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    timeZone: "America/Costa_Rica",
    year: "numeric",
  },
} as const satisfies {
  LOCALE: string;
  OPTIONS: Intl.DateTimeFormatOptions;
};
