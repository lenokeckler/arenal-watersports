import {
  PAYMENT_CHOICE,
  type PaymentChoice,
} from "./PaymentChoice.constants";

export const PAYMENT_CHOICE_COPY: Record<
  PaymentChoice,
  string
> = {
  [PAYMENT_CHOICE.CASH]: "Efectivo",
  [PAYMENT_CHOICE.CARD]: "Tarjeta",
  [PAYMENT_CHOICE.PAYPAL]: "PayPal",
  [PAYMENT_CHOICE.SINPE]: "SINPE",
  [PAYMENT_CHOICE.OTHER]: "Otro",
};
