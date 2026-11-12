export const MONEY_AMOUNT_ISSUE = {
  FORMAT: "format",
  NOT_POSITIVE: "not_positive",
  PRECISION: "precision",
} as const;

export type MoneyAmountIssue =
  (typeof MONEY_AMOUNT_ISSUE)[keyof typeof MONEY_AMOUNT_ISSUE];
