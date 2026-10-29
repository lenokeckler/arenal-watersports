import { DAILY_INCOME_BAR } from "../constants/DailyIncome.constants";

export const computeBarPercent = (
  amount: number,
  largestAmount: number
): number => {
  const percent = Math.round(
    (amount / largestAmount) * DAILY_INCOME_BAR.MAX_PERCENT
  );
  if (!Number.isFinite(percent)) {
    return DAILY_INCOME_BAR.MIN_PERCENT;
  }
  return Math.min(
    DAILY_INCOME_BAR.MAX_PERCENT,
    Math.max(DAILY_INCOME_BAR.MIN_PERCENT, percent)
  );
};
