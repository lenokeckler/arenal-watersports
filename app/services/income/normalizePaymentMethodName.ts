import { PAYMENT_METHOD_TEXT } from "@/app/constants";

export const normalizePaymentMethodName = (
  paymentMethod: string
): string =>
  paymentMethod
    .normalize(PAYMENT_METHOD_TEXT.NORMALIZATION_FORM)
    .trim()
    .replace(
      PAYMENT_METHOD_TEXT.INNER_WHITESPACE,
      PAYMENT_METHOD_TEXT.SINGLE_SPACE
    );
