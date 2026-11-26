import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import type { ReservationChargePaymentChoice } from "../models/ReservationChargePaymentChoice.type";

export const isReservationChargePaymentChoice = (
  value: unknown
): value is ReservationChargePaymentChoice =>
  Object.values(RESERVATION_CHARGE_PAYMENT_CHOICE).some(
    (choice) => choice === value
  );
