import { RESERVATION_CHARGE_FORM_COPY as COPY } from "../constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_LIMITS } from "../constants/ReservationChargeLimits.constants";
import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";

export const CARD_LABEL =
  COPY.PAYMENT_CHOICE_LABEL[
    RESERVATION_CHARGE_PAYMENT_CHOICE.CARD
  ];
export const OTHER_LABEL =
  COPY.PAYMENT_CHOICE_LABEL[
    RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
  ];
export const OTHER_METHOD_TEXT = "Transferencia";
export const TOO_LONG_METHOD_TEXT = "x".repeat(
  RESERVATION_CHARGE_LIMITS.PAYMENT_METHOD_MAX_LENGTH + 1
);
