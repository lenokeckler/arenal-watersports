import { STRING, type CurrencyCode } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { findMoneyAmountIssue } from "@/app/utils/money/findMoneyAmountIssue";
import { TARIFF_PRICE_ERROR_COPY } from "../constants/TariffPriceErrorCopy.constants";
import { TARIFF_PRICE_LIMITS } from "../constants/TariffPriceLimits.constants";

export const validateTariffPriceText = (
  priceText: string,
  currency: CurrencyCode
): NullableUndefined<string> => {
  const trimmedText = priceText.trim();
  if (trimmedText === STRING.Empty) {
    return undefined;
  }
  const issue = findMoneyAmountIssue(
    trimmedText,
    TARIFF_PRICE_LIMITS[currency]
  );
  return issue
    ? TARIFF_PRICE_ERROR_COPY[currency][issue]
    : undefined;
};
