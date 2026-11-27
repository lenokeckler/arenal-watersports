import type { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";

export type ReservationChargePaymentChoice =
  (typeof RESERVATION_CHARGE_PAYMENT_CHOICE)[keyof typeof RESERVATION_CHARGE_PAYMENT_CHOICE];
