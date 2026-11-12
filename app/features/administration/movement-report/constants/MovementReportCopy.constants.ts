import type { MovementReportWeekday } from "./MovementReport.constants";

export const MOVEMENT_REPORT_COPY = {
  EMPTY: "Todavía no hay movimiento para graficar.",
  ERROR:
    "No se pudo cargar el movimiento. Intente de nuevo.",
  HEADING: "Movimiento por día y por mes",
  INCOME_TITLE: (currency: string) =>
    `Ingresos netos por mes en ${currency}`,
  INTRO:
    "Compare los meses de cada temporada y vea qué días de la semana cargan la operación y cuáles quedan flojos.",
  MONTH_DEPARTURES_TITLE: "Salidas por mes",
  WEEKDAY_DEPARTURES_TITLE:
    "Salidas por día de la semana, últimos 12 meses",
} as const;

export const MOVEMENT_REPORT_WEEKDAY_LABEL: Record<
  MovementReportWeekday,
  string
> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};
