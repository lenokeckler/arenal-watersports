import {
  RESERVATION_STATUS,
  type ReservationStatus,
} from "@/app/constants";

export const UNIT_RESERVATION_STATUS_LABEL: Record<
  ReservationStatus,
  string
> = {
  [RESERVATION_STATUS.CANCELLED]: "Cancelada",
  [RESERVATION_STATUS.CLOSED]: "Finalizada",
  [RESERVATION_STATUS.DISPATCHED]: "En curso",
  [RESERVATION_STATUS.SCHEDULED]: "Agendada",
};
