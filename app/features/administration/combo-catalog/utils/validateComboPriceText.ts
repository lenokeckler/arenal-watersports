import { STRING } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { findMoneyAmountIssue } from "@/app/utils/money/findMoneyAmountIssue";
import { COMBO_AUDIENCE_CURRENCY } from "../constants/ComboAudienceCurrency.constants";
import { COMBO_PRICE_ERROR_COPY } from "../constants/ComboPriceErrorCopy.constants";
import { COMBO_PRICE_LIMITS } from "../constants/ComboPriceLimits.constants";
import type { ComboAudience } from "../models/ComboAudience.type";

export const validateComboPriceText = (
  priceText: string,
  audience: ComboAudience
): NullableUndefined<string> => {
  const trimmedText = priceText.trim();
  const errorCopy = COMBO_PRICE_ERROR_COPY[audience];
  if (trimmedText === STRING.Empty) {
    return errorCopy.required;
  }
  const issue = findMoneyAmountIssue(
    trimmedText,
    COMBO_PRICE_LIMITS[COMBO_AUDIENCE_CURRENCY[audience]]
  );
  return issue ? errorCopy.issues[issue] : undefined;
};
