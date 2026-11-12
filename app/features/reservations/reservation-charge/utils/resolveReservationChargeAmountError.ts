import {
  MONEY_AMOUNT_DECIMAL_SEPARATOR,
  MONEY_AMOUNT_ISSUE,
  STRING,
  type CurrencyCode,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { findMoneyAmountIssue } from "@/app/utils/money/findMoneyAmountIssue";
import { normalizeMoneyAmountText } from "@/app/utils/money/normalizeMoneyAmountText";
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
  const [, decimalDigits = STRING.Empty] =
    normalizeMoneyAmountText(trimmed).split(
      MONEY_AMOUNT_DECIMAL_SEPARATOR
    );
  return issue === MONEY_AMOUNT_ISSUE.PRECISION &&
    decimalDigits.length > limits.decimalPlaces
    ? COPY.AMOUNT_TOO_MANY_DECIMALS
    : COPY.AMOUNT[issue];
};
