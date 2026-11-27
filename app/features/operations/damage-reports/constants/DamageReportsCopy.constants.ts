const countDamages = (count: number): string =>
  count === 1 ? "1 daño" : `${count} daños`;

export const DAMAGE_REPORTS_COPY = {
  ALL_CAUSES: "Todas las causas",
  CALENDAR_LABEL: "Calendario de daños",
  CAUSE_LABEL: "Causa",
  CHART_HINT:
    "Toque una barra para ver esos daños en el calendario.",
  CHART_HINT_PENDING:
    "Los que faltan por completar no tienen causa todavía.",
  CHART_LABEL: "Daños por causa",
  COMPLETE: "Completar reporte",
  DAY_EMPTY: "No hay daños anotados este día.",
  DAY_LABEL: (day: string, damages: number): string =>
    damages ? `${day}, ${countDamages(damages)}` : day,
  DAY_TODAY: (day: string): string => `Hoy · ${day}`,
  DAY_TOTAL: countDamages,
  DETAIL: (cause: string, description: string): string =>
    `${cause}. ${description}`,
  ERROR: "No se pudieron cargar los reportes de daño.",
  FORBIDDEN: "No tiene acceso a las operaciones.",
  HEADING: "Daños",
  HITS: (hits: number): string =>
    `Golpes que sumó: ${hits}`,
  NEW_REPORT: "Reportar daño",
  PENDING_DETAIL: (unit: string, day: string): string =>
    `${unit} · ${day}`,
  PENDING_MANY_DETAIL: "Falta anotar qué pasó.",
  PENDING_OPEN: "Ver",
  PENDING_ONE_ACTION: "Completar",
  PENDING_TITLE: (count: number): string =>
    count === 1
      ? "1 reporte por completar"
      : `${count} reportes por completar`,
  PERIOD_LABEL: "Período",
  PERIODS: {
    month: "Este mes",
    six: "6 meses",
  },
  SAVED: {
    complete: "Reporte guardado.",
    later: "Quedó por completar.",
  },
  STAT_PENDING: "Por completar",
  STAT_TOTAL: "Daños del período",
  TABS: {
    calendar: "Calendario",
    charts: "Gráficos",
  },
  TABS_LABEL: "Vista de daños",
  TOP_COUNT: countDamages,
  TOP_EMPTY: "Sin daños en el período.",
  TOP_HEADING: "Máquinas con más daños",
  VIEW_PHOTOS: "Ver fotos",
} as const;

export const DAMAGE_REPORTS_HEADING_ID = "reportes-de-dano";
