import type { RESERVATION_EXTRA_TIME_SOURCE } from "../constants/ReservationExtraTimeSource.constants";

export type ReservationExtraTimeSource =
  (typeof RESERVATION_EXTRA_TIME_SOURCE)[keyof typeof RESERVATION_EXTRA_TIME_SOURCE];
