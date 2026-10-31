import type { CurrencyCode } from "@/app/constants";
import type { PaymentMethodIncome } from "./PaymentMethodIncome.interface";

export interface CurrencyIncome {
  currency: CurrencyCode;
  total: number;
  byPaymentMethod: PaymentMethodIncome[];
}
