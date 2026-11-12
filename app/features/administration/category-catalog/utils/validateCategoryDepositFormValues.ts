import {
  CURRENCY_CODE,
  STRING,
  type CurrencyCode,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import { findMoneyAmountIssue } from "@/app/utils/money/findMoneyAmountIssue";
import { CATEGORY_DEPOSIT_ERROR_COPY } from "../constants/CategoryDepositErrorCopy.constants";
import { CATEGORY_DEPOSIT_LIMITS } from "../constants/CategoryDepositLimits.constants";
import type { CategoryDepositFormErrors } from "../models/CategoryDepositFormErrors.interface";
import type { CategoryDepositFormValues } from "../models/CategoryDepositFormValues.interface";

const findDepositError = (
  depositText: string,
  currency: CurrencyCode
): NullableUndefined<string> => {
  const trimmedText = depositText.trim();
  if (trimmedText === STRING.Empty) {
    return undefined;
  }
  const issue = findMoneyAmountIssue(
    trimmedText,
    CATEGORY_DEPOSIT_LIMITS[currency]
  );
  return issue
    ? CATEGORY_DEPOSIT_ERROR_COPY[currency][issue]
    : undefined;
};

export const validateCategoryDepositFormValues = (
  values: CategoryDepositFormValues
): CategoryDepositFormErrors => {
  const errors: CategoryDepositFormErrors = {};
  const depositUsdError = findDepositError(
    values.depositUsd,
    CURRENCY_CODE.USD
  );
  const depositCrcError = findDepositError(
    values.depositCrc,
    CURRENCY_CODE.CRC
  );
  if (depositUsdError) {
    errors.depositUsd = depositUsdError;
  }
  if (depositCrcError) {
    errors.depositCrc = depositCrcError;
  }
  return errors;
};
