import type { RESERVATION_EXTRA_TIME_UNAVAILABLE_REASON } from "../constants/ReservationExtraTimeUnavailableReason.constants";

export type ReservationExtraTimeUnavailableReason =
  (typeof RESERVATION_EXTRA_TIME_UNAVAILABLE_REASON)[keyof typeof RESERVATION_EXTRA_TIME_UNAVAILABLE_REASON];
