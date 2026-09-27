export const DATE_FORMAT = {
  LOCALE: "es-ES",
} as const;

export const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions =
  {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  } as const;

export const DATE_TIME_ZONE = {
  getUserTimeZone: (): string =>
    Intl.DateTimeFormat().resolvedOptions().timeZone,
} as const;
