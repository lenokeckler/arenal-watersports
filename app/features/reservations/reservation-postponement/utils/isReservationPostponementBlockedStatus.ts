import { RESERVATION_POSTPONEMENT_BLOCKED_STATUS } from "../constants/ReservationPostponementBlockedStatus.constants";
import type { ReservationPostponementBlockedStatus } from "../models/ReservationPostponementBlockedStatus.type";
import type { ReservationPostponementStatus } from "../models/ReservationPostponementStatus.type";

export const isReservationPostponementBlockedStatus = (
  status: ReservationPostponementStatus
): status is ReservationPostponementBlockedStatus =>
  status ===
    RESERVATION_POSTPONEMENT_BLOCKED_STATUS.CANCELLED ||
  status === RESERVATION_POSTPONEMENT_BLOCKED_STATUS.CLOSED;
