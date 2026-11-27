export const DAMAGE_PERIOD = {
  MONTH: "month",
  SIX_MONTHS: "six",
} as const;

export const DAMAGE_TAB = {
  CALENDAR: "calendar",
  CHARTS: "charts",
} as const;

export const DAMAGE_REPORTS_QUERY = {
  CAUSE: "cause",
  DAY: "day",
  MONTH: "month",
  PENDING: "pending",
  PENDING_OPEN: "open",
  PERIOD: "period",
  SAVED: "saved",
  TAB: "tab",
} as const;

export const DAMAGE_REPORTS_LEGACY_UNIT_QUERY = "unidad";

export const DAMAGE_REPORTS_LIMITS = {
  TOP_UNITS: 5,
} as const;

export const DAMAGE_CAUSE_FIELD_ID = "damage-cause";

export const DAMAGE_REPORTS_ERROR = {
  LOAD_REPORTS: "load the damage reports",
  LOAD_UNIT: "load the unit of the damage reports",
} as const;

export const DAMAGE_REPORTS_PAGINATION = {
  FIRST_PAGE: 1,
  MAX_PAGE: 100_000,
  PAGE_SIZE: 10,
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
