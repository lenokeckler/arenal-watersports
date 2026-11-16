import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import type { ReservationChargeErrors } from "../models/ReservationChargeErrors.interface";
import type { ReservationChargePaymentChoice } from "../models/ReservationChargePaymentChoice.type";

export const resolveReservationChargeMethodRefusalErrors = (
  message: NullableUndefined<string>,
  paymentChoice: NullableRef<ReservationChargePaymentChoice>
): ReservationChargeErrors => {
  if (message === undefined) {
    return {};
  }
  return paymentChoice ===
    RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
    ? { otherPaymentMethod: message }
    : { paymentChoice: message };
};
