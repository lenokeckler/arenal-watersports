import type {
  CurrencyCode,
  MoneyAmountIssue,
} from "@/app/constants";

export interface CategoryDepositInputCase {
  amountText: string;
  currency: CurrencyCode;
  issue: MoneyAmountIssue;
  scenario: string;
}
