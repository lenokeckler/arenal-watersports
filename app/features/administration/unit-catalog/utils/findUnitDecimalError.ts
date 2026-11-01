import {
  MONEY_AMOUNT_ISSUE,
  STRING,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { findMoneyAmountIssue } from "@/app/utils/money/findMoneyAmountIssue";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_USAGE_LIMITS } from "../constants/UnitFormLimits.constants";

export const findUnitDecimalError = (
  decimalText: string
): NullableUndefined<string> => {
  const trimmedText = decimalText.trim();
  if (trimmedText === STRING.Empty) {
    return undefined;
  }
  const issue = findMoneyAmountIssue(
    trimmedText,
    UNIT_USAGE_LIMITS
  );
  const isInvalid =
    issue !== null &&
    issue !== MONEY_AMOUNT_ISSUE.NOT_POSITIVE;
  return isInvalid
    ? UNIT_FORM_ERROR_COPY.DECIMAL_INVALID
    : undefined;
};
