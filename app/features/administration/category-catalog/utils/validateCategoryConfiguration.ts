import type { CategoryConfigurationErrors } from "../models/CategoryConfigurationErrors.interface";
import type { CategoryConfigurationValidation } from "../models/CategoryConfigurationValidation.interface";
import type { CategoryEditedValues } from "../models/CategoryEditedValues.interface";
import { countConfigurationErrors } from "./countConfigurationErrors";
import { validateCategoryAlertFormValues } from "./validateCategoryAlertFormValues";
import { validateCategoryBehaviorFormValues } from "./validateCategoryBehaviorFormValues";
import { validateCategoryDepositFormValues } from "./validateCategoryDepositFormValues";

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
  const invalidFieldCount =
    countConfigurationErrors(errors);

  return {
    errors,
    invalidFieldCount,
    isValid: invalidFieldCount === 0,
  };
};
