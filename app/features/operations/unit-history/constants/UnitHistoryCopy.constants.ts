export const UNIT_HISTORY_COPY = {
  DAMAGE_DETAIL: (
    cause: string,
    description: string
  ): string => `${cause}. ${description}`,
  DAMAGE_EMPTY: "Sin reportes de daño.",
  DAMAGE_HEADING: "Daños",
  COMPLETE: "Completar reporte",
  ERROR: "No se pudo cargar el historial de la máquina.",
  EXTERNAL: "Taller externo",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HEADING: "Historial de la máquina",
  HITS_ADDED: (hits: number): string =>
    `Golpes que sumó: ${hits}`,
  JOBS_EMPTY: "Esta máquina no tiene trabajos registrados.",
  JOBS_HEADING: "Trabajos",
  JOBS_PAGES_LABEL: "Páginas de los trabajos",
  NEXT_OIL: (reading: string): string =>
    `Próximo cambio de aceite: ${reading}`,
  NOT_FOUND: "No se encontró la máquina.",
  NO_COST: "Sin costo",
  NO_SPEND: "Sin gasto",
  REGISTER_JOB: "Registrar trabajo",
  REPORT_DAMAGE: "Reportar daño",
  STAT_JOBS: "Trabajos",
  STAT_SPEND: "Gastado",
  STATUS: {
    available: "Disponible",
    damaged: "Dañada",
    decommissioned: "Dada de baja",
    in_maintenance: "En mantenimiento",
    in_repair: "En reparación",
  },
  USAGE_UNIT: {
    engine_hours: " h",
    kilometers: " km",
  },
  VIEW_PHOTOS: "Ver fotos",
} as const;
