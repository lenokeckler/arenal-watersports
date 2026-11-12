import type {
  CurrencyCode,
  MoneyAmountIssue,
} from "@/app/constants";
import type { CategoryDepositFormValues } from "./CategoryDepositFormValues.interface";

export interface CategoryDepositIssueCase {
  description: string;
  currency: CurrencyCode;
  field: keyof CategoryDepositFormValues;
  amountText: string;
  issue: MoneyAmountIssue;
}
