import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";

export const clearCategoryAlertFieldErrors = (
  errors: CategoryAlertFormErrors,
  fields: Array<keyof CategoryAlertFormErrors>
): CategoryAlertFormErrors => {
  if (
    fields.every((field) => errors[field] === undefined)
  ) {
    return errors;
  }

  const remainingErrors = { ...errors };
  fields.forEach((field) => {
    delete remainingErrors[field];
  });
  return remainingErrors;
};
