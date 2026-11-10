import type { ReservationPostponementStatus } from "../models/ReservationPostponementStatus.type";

export const RESERVATION_POSTPONEMENT_BLOCKED_STATUS = {
  CANCELLED: "cancelled",
  CLOSED: "closed",
} as const satisfies Record<
  string,
  ReservationPostponementStatus
>;
