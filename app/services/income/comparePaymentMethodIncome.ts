import { PAYMENT_METHOD_TEXT } from "@/app/constants";
import type { PaymentMethodIncome } from "./models/PaymentMethodIncome.interface";

export const comparePaymentMethodIncome = (
  first: PaymentMethodIncome,
  second: PaymentMethodIncome
): number =>
  second.amount - first.amount ||
  first.name.localeCompare(
    second.name,
    PAYMENT_METHOD_TEXT.LOCALE
  );
