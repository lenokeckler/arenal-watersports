import type { CurrencyCode } from "@/app/constants";
import { DAILY_INCOME_ID } from "../constants/DailyIncome.constants";
import type { CurrencyIncomeIds } from "../models/CurrencyIncomeIds.interface";

export const buildCurrencyIncomeIds = (
  currency: CurrencyCode
): CurrencyIncomeIds => {
  const base = `${DAILY_INCOME_ID.PREFIX}${currency.toLowerCase()}`;
  return {
    breakdown: `${base}${DAILY_INCOME_ID.BREAKDOWN_SUFFIX}`,
    title: `${base}${DAILY_INCOME_ID.TITLE_SUFFIX}`,
  };
};
