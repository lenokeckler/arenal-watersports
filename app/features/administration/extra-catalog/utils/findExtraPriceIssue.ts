import {
  MONEY_AMOUNT_ISSUE,
  type CurrencyCode,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { findMoneyAmountIssue } from "@/app/utils/money/findMoneyAmountIssue";
import { EXTRA_PRICE_LIMITS } from "../constants/ExtraPriceLimits.constants";
import type { ExtraPriceIssue } from "../models/ExtraPriceIssue.type";

export const findExtraPriceIssue = (
  priceText: string,
  currency: CurrencyCode
): NullableRef<ExtraPriceIssue> => {
  const issue = findMoneyAmountIssue(
    priceText,
    EXTRA_PRICE_LIMITS[currency]
  );
  return issue === MONEY_AMOUNT_ISSUE.NOT_POSITIVE
    ? null
    : issue;
};
