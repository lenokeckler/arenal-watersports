import type { ReservationPostponementStatus } from "../models/ReservationPostponementStatus.type";

export const RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY: Partial<
  Record<ReservationPostponementStatus, string>
> = {
  cancelled: "La reserva fue cancelada.",
  closed: "La reserva ya está cerrada.",
};

export const RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY = {
  RULE: "Solo se pueden posponer reservas agendadas o ya despachadas.",
  TITLE: "Esta reserva ya no se puede posponer",
} as const;
