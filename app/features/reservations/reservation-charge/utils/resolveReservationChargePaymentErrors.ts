import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import type { ReservationChargePaymentErrors } from "../models/ReservationChargePaymentErrors.interface";
import type { ReservationChargePaymentFields } from "../models/ReservationChargePaymentFields.interface";
import { resolveReservationChargePaymentMethodError } from "./resolveReservationChargePaymentMethodError";

export const resolveReservationChargePaymentErrors = ({
  otherPaymentMethod,
  paymentChoice,
}: ReservationChargePaymentFields): ReservationChargePaymentErrors => {
  if (paymentChoice === null) {
    return { paymentChoice: COPY.CHOICE_REQUIRED };
  }
  if (
    paymentChoice !==
    RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
  ) {
    return {};
  }
  const otherError =
    resolveReservationChargePaymentMethodError(
      otherPaymentMethod
    );
  return otherError === undefined
    ? {}
    : { otherPaymentMethod: otherError };
};
