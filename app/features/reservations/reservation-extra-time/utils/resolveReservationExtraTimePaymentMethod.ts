import {
  PAYMENT_CHOICE,
  PAYMENT_CHOICE_COPY,
  type PaymentChoice,
} from "@/app/constants";
import { trimReservationExtraTimePaymentMethod } from "./trimReservationExtraTimePaymentMethod";

export const resolveReservationExtraTimePaymentMethod = (
  paymentChoice: PaymentChoice,
  otherPaymentMethod: string
): string =>
  paymentChoice === PAYMENT_CHOICE.OTHER
    ? trimReservationExtraTimePaymentMethod(
        otherPaymentMethod
      )
    : PAYMENT_CHOICE_COPY[paymentChoice];
