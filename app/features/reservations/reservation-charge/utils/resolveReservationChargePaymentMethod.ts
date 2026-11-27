import { STRING } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_EDGE_WHITESPACE_PATTERN } from "../constants/ReservationChargePaymentMethodPatterns.constants";
import type { ReservationChargePaymentFields } from "../models/ReservationChargePaymentFields.interface";

export const resolveReservationChargePaymentMethod = ({
  otherPaymentMethod,
  paymentChoice,
}: ReservationChargePaymentFields): string => {
  if (paymentChoice === null) {
    return STRING.Empty;
  }
  if (
    paymentChoice ===
    RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
  ) {
    return otherPaymentMethod.replace(
      RESERVATION_CHARGE_EDGE_WHITESPACE_PATTERN,
      STRING.Empty
    );
  }
  return RESERVATION_CHARGE_FORM_COPY.PAYMENT_CHOICE_LABEL[
    paymentChoice
  ];
};
