import type { MoneyAmountIssue } from "@/app/constants";

export interface ComboPriceErrorCopy {
  issues: Record<MoneyAmountIssue, string>;
  required: string;
}
