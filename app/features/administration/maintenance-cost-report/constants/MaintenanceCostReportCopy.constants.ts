export const MAINTENANCE_COST_COPY = {
  EMPTY:
    "Todavía no hay costos de mantenimiento registrados.",
  ERROR: "No se pudo cargar el costo de mantenimiento.",
  HEADING: "Costo de mantenimiento por máquina",
  JOBS_PREFIX: "Trabajos con costo: ",
  LAST_JOB_PREFIX: "Último trabajo: ",
  PART_SEPARATOR: " · ",
  TITLE_ID_PREFIX: "costo-mantenimiento-",
  TOTAL_PREFIX: "Total: ",
  UNIT_SEPARATOR: " · ",
} as const;

export const MAINTENANCE_COST_HEADING_ID =
  "costo-de-mantenimiento";

export const MAINTENANCE_COST_DATE_SEPARATOR = "/";

export const MAINTENANCE_COST_CURRENCY_SYMBOL = {
  CRC: "₡",
  USD: "$",
} as const;
