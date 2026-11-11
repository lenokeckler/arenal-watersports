import type { ReservationCancellationBlockedStatus } from "../models/ReservationCancellationBlockedStatus.type";

export const RESERVATION_CANCELLATION_UNAVAILABLE_COPY = {
  BODY: {
    cancelled: "La reserva ya fue cancelada.",
    closed: "La reserva ya está cerrada.",
  } satisfies Record<
    ReservationCancellationBlockedStatus,
    string
  >,
  RULE: "Aquí solo se cancelan las reservas agendadas o con la salida en curso.",
  TITLE: "Esta reserva no se puede cancelar aquí",
} as const;
