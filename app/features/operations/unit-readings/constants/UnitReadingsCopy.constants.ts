export const UNIT_READINGS_COPY = {
  CORRECT: "Corregir",
  EMPTY: "No hay unidades con motor.",
  ERROR: "No se pudieron cargar las unidades.",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HEADING: "Datos de las máquinas",
  OIL_OVERDUE: "Aceite vencido",
  OUT_OF_SERVICE: "Fuera de servicio",
  PART_SEPARATOR: " · ",
  STATUS: {
    available: "Disponible",
    damaged: "Dañada",
    in_maintenance: "En mantenimiento",
    in_repair: "En reparación",
  },
  TITLE_ID_PREFIX: "datos-maquina-",
  UNIT_SEPARATOR: " · ",
  USAGE_UNIT: {
    engine_hours: " h",
    kilometers: " km",
  },
  USAGE_NONE: "Sin medidor",
} as const;

export const UNIT_READINGS_HEADING_ID =
  "datos-de-las-maquinas";
