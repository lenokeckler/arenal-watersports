import type { CategoryDepositFormErrors } from "../models/CategoryDepositFormErrors.interface";
import type { CategoryDepositFormValues } from "../models/CategoryDepositFormValues.interface";
import { validateCategoryDepositFormValues } from "./validateCategoryDepositFormValues";

export const reportCategoryDepositErrors = (
  values: CategoryDepositFormValues,
  onValidationErrors: (
    errors: CategoryDepositFormErrors
  ) => void
): boolean => {
  const errors = validateCategoryDepositFormValues(values);
  onValidationErrors(errors);

  return Object.keys(errors).length > 0;
};
