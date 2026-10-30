import {
  MONEY_AMOUNT_DECIMAL_SEPARATOR,
  MONEY_AMOUNT_ISSUE,
  MONEY_AMOUNT_LEADING_ZEROS_PATTERN,
  MONEY_AMOUNT_PATTERN,
  STRING,
  type MoneyAmountIssue,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { MoneyAmountLimits } from "./models/MoneyAmountLimits.interface";

export const findMoneyAmountIssue = (
  amountText: string,
  limits: MoneyAmountLimits
): NullableRef<MoneyAmountIssue> => {
  if (!MONEY_AMOUNT_PATTERN.test(amountText)) {
    return MONEY_AMOUNT_ISSUE.FORMAT;
  }
  const [integerDigits, decimalDigits = STRING.Empty] =
    amountText.split(MONEY_AMOUNT_DECIMAL_SEPARATOR);
  const significantIntegerDigits = integerDigits.replace(
    MONEY_AMOUNT_LEADING_ZEROS_PATTERN,
    STRING.Empty
  );
  if (
    significantIntegerDigits.length >
      limits.maxIntegerDigits ||
    decimalDigits.length > limits.decimalPlaces
  ) {
    return MONEY_AMOUNT_ISSUE.PRECISION;
  }
  if (Number(amountText) <= 0) {
    return MONEY_AMOUNT_ISSUE.NOT_POSITIVE;
  }
  return null;
};
