import type { CurrencyCode } from "@/app/constants";

export interface DepositSummaryProps {
  customerName: string;
  code: string;
  amount: number;
  currency: CurrencyCode;
}
