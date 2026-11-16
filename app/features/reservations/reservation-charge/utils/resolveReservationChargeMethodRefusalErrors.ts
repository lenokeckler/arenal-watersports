import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY } from "../constants/ReservationChargeValidationCopy.constants";
import type { ReservationChargeErrors } from "../models/ReservationChargeErrors.interface";
import type { ReservationChargePaymentChoice } from "../models/ReservationChargePaymentChoice.type";

export const resolveReservationChargeMethodRefusalErrors = (
  message: NullableUndefined<string>,
  paymentChoice: NullableRef<ReservationChargePaymentChoice>
): ReservationChargeErrors => {
  if (message === undefined) {
    return {};
  }
  if (paymentChoice === null) {
    return {
      paymentChoice:
        RESERVATION_CHARGE_VALIDATION_COPY.CHOICE_REQUIRED,
    };
  }
  return paymentChoice ===
    RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
    ? { otherPaymentMethod: message }
    : { paymentChoice: message };
};
