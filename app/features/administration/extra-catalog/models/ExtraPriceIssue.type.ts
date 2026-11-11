import type {
  MONEY_AMOUNT_ISSUE,
  MoneyAmountIssue,
} from "@/app/constants";

export type ExtraPriceIssue = Exclude<
  MoneyAmountIssue,
  typeof MONEY_AMOUNT_ISSUE.NOT_POSITIVE
>;
