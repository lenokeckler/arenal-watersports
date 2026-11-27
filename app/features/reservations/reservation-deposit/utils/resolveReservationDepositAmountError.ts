import {
  MONEY_AMOUNT_ISSUE,
  STRING,
  type CurrencyCode,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { countMoneyAmountDecimals } from "@/app/utils/money/countMoneyAmountDecimals";
import { findMoneyAmountIssue } from "@/app/utils/money/findMoneyAmountIssue";
import { RESERVATION_DEPOSIT_LIMITS } from "../constants/ReservationDepositLimits.constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY as COPY } from "../constants/ReservationDepositValidationCopy.constants";

export const resolveReservationDepositAmountError = (
  amountText: string,
  currency: CurrencyCode
): NullableUndefined<string> => {
  const trimmed = amountText.trim();
  if (trimmed === STRING.Empty) {
    return COPY.AMOUNT_REQUIRED;
  }
  const limits =
    RESERVATION_DEPOSIT_LIMITS.AMOUNT[currency];
  const issue = findMoneyAmountIssue(trimmed, limits);
  if (issue === null) {
    return undefined;
  }
  return issue === MONEY_AMOUNT_ISSUE.PRECISION &&
    countMoneyAmountDecimals(trimmed) > limits.decimalPlaces
    ? COPY.AMOUNT_TOO_MANY_DECIMALS
    : COPY.AMOUNT[issue];
};
