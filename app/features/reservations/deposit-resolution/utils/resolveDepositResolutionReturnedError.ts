import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  STRING,
  type CurrencyCode,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { countMoneyAmountDecimals } from "@/app/utils/money/countMoneyAmountDecimals";
import { findMoneyAmountIssue } from "@/app/utils/money/findMoneyAmountIssue";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { toMinorUnits } from "@/app/utils/money/toMinorUnits";
import { DEPOSIT_RESOLUTION_LIMITS } from "../constants/DepositResolutionLimits.constants";
import { DEPOSIT_RESOLUTION_VALIDATION_COPY as COPY } from "../constants/DepositResolutionValidationCopy.constants";
import { parseDepositResolutionAmount } from "./parseDepositResolutionAmount";

const findIssue = (
  trimmed: string,
  currency: CurrencyCode
): NullableUndefined<string> => {
  const limits = DEPOSIT_RESOLUTION_LIMITS.AMOUNT[currency];
  const issue = findMoneyAmountIssue(trimmed, limits);
  if (
    issue === null ||
    (issue === MONEY_AMOUNT_ISSUE.NOT_POSITIVE &&
      parseDepositResolutionAmount(trimmed) === 0)
  ) {
    return undefined;
  }
  return issue === MONEY_AMOUNT_ISSUE.PRECISION &&
    countMoneyAmountDecimals(trimmed) > limits.decimalPlaces
    ? COPY.RETURNED_TOO_MANY_DECIMALS
    : COPY.RETURNED[issue];
};

export const resolveDepositResolutionReturnedError = (
  returnedText: string,
  deposit?: { amount: number; currency: CurrencyCode }
): NullableUndefined<string> => {
  const trimmed = returnedText.trim();
  if (trimmed === STRING.Empty) {
    return COPY.RETURNED_REQUIRED;
  }
  const issue = findIssue(
    trimmed,
    deposit?.currency ?? CURRENCY_CODE.CRC
  );
  if (issue !== undefined || deposit === undefined) {
    return issue;
  }
  return toMinorUnits(
    parseDepositResolutionAmount(trimmed)
  ) > toMinorUnits(deposit.amount)
    ? COPY.RETURNED_ABOVE_DEPOSIT(formatMoney(deposit))
    : undefined;
};
