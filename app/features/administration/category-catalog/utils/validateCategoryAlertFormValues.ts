import { CATEGORY_ALERT_ERROR_COPY } from "../constants/CategoryAlertErrorCopy.constants";
import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";
import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import { doesCategoryAlertTypeIncludeExpiry } from "./doesCategoryAlertTypeIncludeExpiry";
import { doesCategoryAlertTypeIncludeQuantity } from "./doesCategoryAlertTypeIncludeQuantity";
import { findCategoryAlertIssue } from "./findCategoryAlertIssue";

export const validateCategoryAlertFormValues = (
  values: CategoryAlertFormValues
): CategoryAlertFormErrors => {
  const errors: CategoryAlertFormErrors = {};
  if (
    doesCategoryAlertTypeIncludeQuantity(values.alertType)
  ) {
    const issue = findCategoryAlertIssue(
      values.minQuantityText
    );
    if (issue) {
      errors.minQuantityText =
        CATEGORY_ALERT_ERROR_COPY.minQuantityText[issue];
    }
  }
  if (
    doesCategoryAlertTypeIncludeExpiry(values.alertType)
  ) {
    const issue = findCategoryAlertIssue(
      values.expiryDaysText
    );
    if (issue) {
      errors.expiryDaysText =
        CATEGORY_ALERT_ERROR_COPY.expiryDaysText[issue];
    }
  }
  return errors;
};
