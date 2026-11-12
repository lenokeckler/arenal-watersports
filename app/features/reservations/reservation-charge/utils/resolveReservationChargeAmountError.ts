import {
  MONEY_AMOUNT_ISSUE,
  STRING,
  type CurrencyCode,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { countMoneyAmountDecimals } from "@/app/utils/money/countMoneyAmountDecimals";
import { findMoneyAmountIssue } from "@/app/utils/money/findMoneyAmountIssue";
import { RESERVATION_CHARGE_LIMITS } from "../constants/ReservationChargeLimits.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";

export const resolveReservationChargeAmountError = (
  amountText: string,
  currency: CurrencyCode
): NullableUndefined<string> => {
  const trimmed = amountText.trim();
  if (trimmed === STRING.Empty) {
    return COPY.AMOUNT_REQUIRED;
  }
  const limits = RESERVATION_CHARGE_LIMITS.AMOUNT[currency];
  const issue = findMoneyAmountIssue(trimmed, limits);
  if (issue === null) {
    return undefined;
  }
  return issue === MONEY_AMOUNT_ISSUE.PRECISION &&
    countMoneyAmountDecimals(trimmed) > limits.decimalPlaces
    ? COPY.AMOUNT_TOO_MANY_DECIMALS
    : COPY.AMOUNT[issue];
};
