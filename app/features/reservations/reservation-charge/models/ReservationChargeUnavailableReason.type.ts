import type { RESERVATION_CHARGE_UNAVAILABLE_REASON } from "../constants/ReservationChargeUnavailableReason.constants";

export type ReservationChargeUnavailableReason =
  (typeof RESERVATION_CHARGE_UNAVAILABLE_REASON)[keyof typeof RESERVATION_CHARGE_UNAVAILABLE_REASON];
