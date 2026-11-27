import type { RESERVATION_EXTRA_TIME_OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";

export type ReservationExtraTimeOutcome =
  (typeof RESERVATION_EXTRA_TIME_OUTCOME)[keyof typeof RESERVATION_EXTRA_TIME_OUTCOME];
