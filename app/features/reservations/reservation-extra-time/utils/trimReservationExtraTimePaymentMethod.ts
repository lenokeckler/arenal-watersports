import {
  PAYMENT_METHOD_TEXT,
  STRING,
} from "@/app/constants";

export const trimReservationExtraTimePaymentMethod = (
  paymentMethod: string
): string =>
  paymentMethod.replace(
    PAYMENT_METHOD_TEXT.EDGE_WHITESPACE,
    STRING.Empty
  );
