import type { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";

export type ReservationRefundReason =
  (typeof RESERVATION_REFUND_REASON)[keyof typeof RESERVATION_REFUND_REASON];
