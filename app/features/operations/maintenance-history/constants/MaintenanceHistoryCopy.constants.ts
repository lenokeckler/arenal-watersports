export const MAINTENANCE_HISTORY_COPY = {
  COST_PREFIX: "Costo: ",
  EMPTY:
    "Todavía no hay trabajos de mantenimiento registrados.",
  ERROR: "No se pudo cargar el historial de mantenimiento.",
  EXTERNAL: "Taller externo",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HEADING: "Historial de mantenimiento",
  NEXT_PAGE: "Siguiente",
  NO_COST: "Sin costo",
  PAGE_LABEL: "Paginación del historial",
  PART_SEPARATOR: " · ",
  PREVIOUS_PAGE: "Anterior",
  TITLE_ID_PREFIX: "historial-trabajo-",
  UNIT_SEPARATOR: " · ",
  WORK_TYPES: {
    oil_change: "Cambio de aceite",
    other: "Otro trabajo",
    part_change: "Cambio de pieza",
    tire_change: "Cambio de llanta",
  },
} as const;

export const MAINTENANCE_HISTORY_HEADING_ID =
  "historial-de-mantenimiento";

export const MAINTENANCE_HISTORY_DATE_SEPARATOR = "/";
