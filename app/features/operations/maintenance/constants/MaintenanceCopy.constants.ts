export const MAINTENANCE_COPY = {
  ERROR: "No se pudo cargar el estado de las máquinas.",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HEADING: "Mantenimiento",
  HISTORY: "Historial de trabajos",
  NEW_JOB: "Registrar un trabajo",
  CURRENT_USAGE: {
    engine_hours: "Horas actuales",
    kilometers: "Km actual",
  },
  NEXT_OIL_CHANGE: "Próximo cambio",
  OIL_EMPTY:
    "Ninguna máquina está cerca de su cambio de aceite.",
  OIL_HEADING: "Cambio de aceite",
  PART_SEPARATOR: " · ",
  SERVICE_EMPTY: "Ninguna máquina está fuera de servicio.",
  SERVICE_HEADING: "Fuera de servicio",
  STATUS: {
    available: "Disponible",
    damaged: "Dañada",
    decommissioned: "Dada de baja",
    in_maintenance: "En mantenimiento",
    in_repair: "En reparación",
  },
  VIEW_DAMAGE_REPORTS: "Ver reportes de daño",
  UNIT_SEPARATOR: " · ",
} as const;

export const MAINTENANCE_USAGE_UNIT = {
  engine_hours: " h",
  kilometers: " km",
} as const;

export const MAINTENANCE_HEADING_ID = "mantenimiento";

export const MAINTENANCE_OIL_HEADING_ID =
  "cambio-de-aceite";

export const MAINTENANCE_SERVICE_HEADING_ID =
  "fuera-de-servicio";
