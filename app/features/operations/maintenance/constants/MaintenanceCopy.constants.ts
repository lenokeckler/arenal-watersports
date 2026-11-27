export const MAINTENANCE_COPY = {
  ALL_MACHINES: "Todas las máquinas",
  ATTEND_EMPTY: "Ninguna máquina necesita atención.",
  ATTEND_DETAIL: (oil: number, out: number): string =>
    [
      oil ? `${oil} de aceite` : "",
      out ? `${out} fuera de servicio` : "",
    ]
      .filter(Boolean)
      .join(" · "),
  ATTEND_HEADING: (count: number): string =>
    `${count} por atender`,
  ATTEND_OIL: "Cambio de aceite",
  ATTEND_OPEN: "Ver",
  ATTEND_OUT: "Fuera de servicio",
  CALENDAR_LABEL: "Calendario de mantenimiento",
  CURRENCY_LABEL: "Moneda",
  DAMAGE_COUNT: (count: number): string =>
    count === 1 ? "1 daño" : `${count} daños`,
  DAY_EMPTY: "No hay nada anotado este día.",
  DAY_LABEL: (
    day: string,
    jobs: number,
    damages: number
  ): string =>
    [
      day,
      jobs ? MAINTENANCE_COPY.JOB_COUNT(jobs) : "",
      damages ? MAINTENANCE_COPY.DAMAGE_COUNT(damages) : "",
    ]
      .filter(Boolean)
      .join(", "),
  DAY_TODAY: (day: string): string => `Hoy · ${day}`,
  ERROR: "No se pudo cargar el estado de las máquinas.",
  EXTERNAL: "Taller externo",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HEADING: "Mantenimiento",
  JOB_COUNT: (count: number): string =>
    count === 1 ? "1 trabajo" : `${count} trabajos`,
  MACHINE_HISTORY: (code: string): string =>
    `Ver todo el historial de ${code}`,
  MACHINE_LABEL: "Máquina",
  NEW_JOB: "Registrar trabajo",
  PART_SEPARATOR: " · ",
  NO_COST: "Sin costo",
  REGISTER_ON_DAY: "Registrar en este día",
  STAT_JOBS: "Trabajos en 6 meses",
  STAT_SPEND: "Gastado en 6 meses",
  STATUS: {
    available: "Disponible",
    damaged: "Dañada",
    decommissioned: "Dada de baja",
    in_maintenance: "En mantenimiento",
    in_repair: "En reparación",
  },
  SPEND_HEADING: "Gasto por mes",
  SPEND_READOUT: (month: string, amount: string): string =>
    `${month}: ${amount}`,
  SUMMARY_TITLE: (code: string, kind: string): string =>
    `${code} · ${kind}`,
  TABLE_AMOUNT: "Gasto",
  TABLE_MONTH: "Mes",
  TABLE_TOGGLE: "Ver como tabla",
  TABS: {
    calendar: "Calendario",
    summary: "Gráficos",
  },
  TABS_LABEL: "Vista de mantenimiento",
  TOP_EMPTY: "Ninguna máquina tiene gasto en esta moneda.",
  TOP_HEADING: "Máquinas con más gasto",

  HISTORY: "Historial de trabajos",
  CURRENT_USAGE: {
    engine_hours: "Horas actuales",
    kilometers: "Km actual",
  },
  NEXT_OIL_CHANGE: "Próximo cambio",
  OIL_EMPTY:
    "Ninguna máquina está cerca de su cambio de aceite.",
  OIL_HEADING: "Cambio de aceite",
  SERVICE_EMPTY: "Ninguna máquina está fuera de servicio.",
  SERVICE_HEADING: "Fuera de servicio",
  VIEW_DAMAGE_REPORTS: "Ver reportes de daño",
  UNIT_SEPARATOR: " · ",
} as const;

export const MAINTENANCE_HEADING_ID = "mantenimiento";

export const MAINTENANCE_USAGE_UNIT = {
  engine_hours: " h",
  kilometers: " km",
} as const;

export const MAINTENANCE_OIL_HEADING_ID =
  "cambio-de-aceite";

export const MAINTENANCE_SERVICE_HEADING_ID =
  "fuera-de-servicio";
