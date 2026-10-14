import { CALENDAR_VIEW } from "./CalendarView.constants";

export const CALENDAR_TEXT = {
  LABELS: {
    [CALENDAR_VIEW.DAY]: "Día",
    [CALENDAR_VIEW.MONTH]: "Mes",
    [CALENDAR_VIEW.WEEK]: "Semana",
    [CALENDAR_VIEW.YEAR]: "Año",
  },
  NEXT: "Siguiente",
  PREVIOUS: "Anterior",
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
