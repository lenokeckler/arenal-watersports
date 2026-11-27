import type { ReservationExtraTimeSource } from "../models/ReservationExtraTimeSource.type";
import { RESERVATION_EXTRA_TIME_SOURCE as SOURCE } from "./ReservationExtraTimeSource.constants";

export const RESERVATION_EXTRA_TIME_UI_COPY = {
  ARRIVED: "Llegó",
  DEPARTED: "Salió",
  EXTENDED_BY: (duration: string): string =>
    `Operaciones la extendió ${duration}`,
  EXTRA_MINUTES: (duration: string): string =>
    `+${duration}`,
  GROUPS_TITLE: "Tiempo de más por grupo",
  HOURS_SUFFIX: " h",
  MINUTES_SUFFIX: " min",
  PLANNED_RETURN: "Regreso previsto",
  RESERVATION: (
    code: string,
    customerName: string
  ): string => `Reserva ${code} · ${customerName}`,
  SOURCE: {
    [SOURCE.EXTENDED]: "Operaciones la extendió",
    [SOURCE.ON_TIME]: "Regresó a tiempo",
    [SOURCE.OVERDUE]: "Se pasó de su hora sin avisar",
  } satisfies Record<ReservationExtraTimeSource, string>,
  TITLE: "Tiempo adicional",
  TOTAL: "Total de la reserva",
} as const;
