import type { RESERVATION_DEPOSIT_UNAVAILABLE_REASON } from "../constants/ReservationDepositUnavailableReason.constants";

export type ReservationDepositUnavailableReason =
  (typeof RESERVATION_DEPOSIT_UNAVAILABLE_REASON)[keyof typeof RESERVATION_DEPOSIT_UNAVAILABLE_REASON];
