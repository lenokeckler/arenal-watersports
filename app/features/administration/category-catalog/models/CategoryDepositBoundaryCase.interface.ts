import type {
  CurrencyCode,
  MoneyAmountIssue,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface CategoryDepositBoundaryCase {
  description: string;
  currency: CurrencyCode;
  amountText: string;
  expectedIssue: NullableRef<MoneyAmountIssue>;
}
