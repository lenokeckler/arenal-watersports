import type { CategoryConfigurationErrors } from "../models/CategoryConfigurationErrors.interface";
import type { CategoryConfigurationValidation } from "../models/CategoryConfigurationValidation.interface";
import type { CategoryEditedValues } from "../models/CategoryEditedValues.interface";
import { validateCategoryAlertFormValues } from "./validateCategoryAlertFormValues";
import { validateCategoryBehaviorFormValues } from "./validateCategoryBehaviorFormValues";
import { validateCategoryDepositFormValues } from "./validateCategoryDepositFormValues";

const countInvalidFields = (
  errors: CategoryConfigurationErrors
): number =>
  Object.values(errors).reduce(
    (total, sectionErrors) =>
      total + Object.keys(sectionErrors).length,
    0
  );

export const validateCategoryConfiguration = (
  values: CategoryEditedValues
): CategoryConfigurationValidation => {
  const errors: CategoryConfigurationErrors = {
    behavior: validateCategoryBehaviorFormValues(
      values.behavior
    ),
    deposit: validateCategoryDepositFormValues(
      values.deposit
    ),
    alerts: validateCategoryAlertFormValues(values.alerts),
  };
  const invalidFieldCount = countInvalidFields(errors);

  return {
    errors,
    invalidFieldCount,
    isValid: invalidFieldCount === 0,
  };
};
