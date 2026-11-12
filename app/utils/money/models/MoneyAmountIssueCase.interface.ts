import type { MoneyAmountIssue } from "@/app/constants";
import type { NullableRef } from "@/app/types";

export interface MoneyAmountIssueCase {
  amountText: string;
  expectedIssue: NullableRef<MoneyAmountIssue>;
}
