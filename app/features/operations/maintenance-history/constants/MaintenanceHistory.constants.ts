export const MAINTENANCE_HISTORY_ERROR = {
  LOAD_HISTORY: "load the maintenance history",
} as const;

export const MAINTENANCE_HISTORY_PAGINATION = {
  FIRST_PAGE: 1,
  MAX_PAGE: 100_000,
  PAGE_SIZE: 20,
  QUERY_KEY: "pagina",
} as const;

export const MAINTENANCE_HISTORY_PAGE_PATTERN = /^\d+$/;

export const MAINTENANCE_HISTORY_QUERY_SEPARATOR = "?";
