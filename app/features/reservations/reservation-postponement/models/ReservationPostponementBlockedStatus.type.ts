import type { RESERVATION_POSTPONEMENT_BLOCKED_STATUS } from "../constants/ReservationPostponementBlockedStatus.constants";

export type ReservationPostponementBlockedStatus =
  (typeof RESERVATION_POSTPONEMENT_BLOCKED_STATUS)[keyof typeof RESERVATION_POSTPONEMENT_BLOCKED_STATUS];
