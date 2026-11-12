import {
  MONEY_AMOUNT_ISSUE,
  type CurrencyCode,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { EXTRA_PRICE_ERROR_COPY } from "../constants/ExtraPriceErrorCopy.constants";
import { findExtraPriceIssue } from "./findExtraPriceIssue";
import { isExtraPriceBlank } from "./isExtraPriceBlank";
import { isTextValue } from "./isTextValue";

export const validateExtraPriceText = (
  priceText: unknown,
  currency: CurrencyCode
): NullableUndefined<string> => {
  if (isExtraPriceBlank(priceText)) {
    return undefined;
  }
  if (!isTextValue(priceText)) {
    return EXTRA_PRICE_ERROR_COPY[currency][
      MONEY_AMOUNT_ISSUE.FORMAT
    ];
  }
  const issue = findExtraPriceIssue(
    priceText.trim(),
    currency
  );
  return issue
    ? EXTRA_PRICE_ERROR_COPY[currency][issue]
    : undefined;
};
