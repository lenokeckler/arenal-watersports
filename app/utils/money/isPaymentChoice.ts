import {
  PAYMENT_CHOICE_ORDER,
  type PaymentChoice,
} from "@/app/constants";

export const isPaymentChoice = (
  value: unknown
): value is PaymentChoice =>
  PAYMENT_CHOICE_ORDER.some((choice) => choice === value);
