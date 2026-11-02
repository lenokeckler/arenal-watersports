import type { CurrencyCode } from "@/app/constants";
import type { PaymentMethodIncome } from "@/app/services/income";

export interface DailyIncomeBarRowProps {
  method: PaymentMethodIncome;
  currency: CurrencyCode;
  percent: number;
}
