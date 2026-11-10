import type { ReservationPostponementStatus } from "../models/ReservationPostponementStatus.type";

export const RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY = {
  RULE: "Solo se pueden posponer reservas agendadas o ya despachadas.",
  STATUS_BODY: {
    cancelled: "La reserva fue cancelada.",
    closed: "La reserva ya está cerrada.",
  } satisfies Partial<
    Record<ReservationPostponementStatus, string>
  >,
  TITLE: "Esta reserva ya no se puede posponer",
} as const;
