export const DAMAGE_REPORTS_ERROR = {
  LOAD_REPORTS: "load the damage reports",
  LOAD_UNIT: "load the unit of the damage reports",
} as const;

export const DAMAGE_REPORTS_PAGINATION = {
  FIRST_PAGE: 1,
  MAX_PAGE: 100_000,
  PAGE_SIZE: 20,
  QUERY_KEY: "pagina",
} as const;

export const DAMAGE_REPORTS_UNIT_QUERY_KEY = "unidad";

export const DAMAGE_REPORTS_PAGE_PATTERN = /^\d+$/;

export const DAMAGE_REPORTS_QUERY_SEPARATOR = "?";

export const DAMAGE_REPORTS_DATE_FORMAT = {
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
