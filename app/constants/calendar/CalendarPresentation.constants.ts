export const CALENDAR_TEXT = {
  LABELS: {
    day: "Día",
    month: "Mes",
    week: "Semana",
    year: "Año",
  },
  NEXT: "Siguiente",
  PREVIOUS: "Anterior",
  TITLE: "Calendario",
  TODAY: "Hoy",
  VIEWS: "Vista del calendario",
  WEEKDAYS: [
    "Lun",
    "Mar",
    "Mié",
    "Jue",
    "Vie",
    "Sáb",
    "Dom",
  ],
} as const;

export const CALENDAR_PRESENTATION = {
  CURRENT_DATE: "date",
  DATE_OPTIONS: {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
  LOCALE: "es-CR",
  MONTH_OPTIONS: { month: "long", year: "numeric" },
  PERIOD_SEPARATOR: " – ",
  TIME_ZONE: "UTC",
  TITLE_ID: "calendar-title",
} as const;
