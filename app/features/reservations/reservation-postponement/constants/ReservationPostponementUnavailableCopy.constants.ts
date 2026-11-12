import type { ReservationPostponementBlockedStatus } from "../models/ReservationPostponementBlockedStatus.type";
import { RESERVATION_POSTPONEMENT_BLOCKED_STATUS } from "./ReservationPostponementBlockedStatus.constants";

export const RESERVATION_POSTPONEMENT_UNAVAILABLE_STATUS_BODY: Record<
  ReservationPostponementBlockedStatus,
  string
> = {
  [RESERVATION_POSTPONEMENT_BLOCKED_STATUS.CANCELLED]:
    "La reserva fue cancelada.",
  [RESERVATION_POSTPONEMENT_BLOCKED_STATUS.CLOSED]:
    "La reserva ya está cerrada.",
};

export const RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY = {
  RULE: "Solo se pueden posponer reservas agendadas o ya despachadas.",
  TITLE: "Esta reserva ya no se puede posponer",
} as const;
