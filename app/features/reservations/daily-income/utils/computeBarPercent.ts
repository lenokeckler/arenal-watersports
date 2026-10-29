import { DAILY_INCOME_BAR } from "../constants/DailyIncome.constants";

export const computeBarPercent = (
  amount: number,
  largestAmount: number
): number => {
  if (largestAmount <= 0) {
    return DAILY_INCOME_BAR.MIN_PERCENT;
  }
  return Math.max(
    DAILY_INCOME_BAR.MIN_PERCENT,
    Math.round(
      (amount / largestAmount) *
        DAILY_INCOME_BAR.MAX_PERCENT
    )
  );
};
