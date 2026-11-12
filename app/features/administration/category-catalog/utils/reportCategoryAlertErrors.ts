import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";
import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import { validateCategoryAlertFormValues } from "./validateCategoryAlertFormValues";

export const reportCategoryAlertErrors = (
  values: CategoryAlertFormValues,
  onValidationErrors: (
    errors: CategoryAlertFormErrors
  ) => void
): boolean => {
  const errors = validateCategoryAlertFormValues(values);
  onValidationErrors(errors);

  return Object.keys(errors).length > 0;
};
