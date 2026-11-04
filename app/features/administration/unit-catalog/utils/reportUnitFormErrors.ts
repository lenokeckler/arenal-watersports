import type { UnitFormErrors } from "../models/UnitFormErrors.interface";
import type { UnitFormRules } from "../models/UnitFormRules.interface";
import type { UnitFormValues } from "../models/UnitFormValues.interface";
import { validateUnitFormValues } from "./validateUnitFormValues";

export const reportUnitFormErrors = (
  values: UnitFormValues,
  rules: UnitFormRules,
  onValidationErrors: (errors: UnitFormErrors) => void
): boolean => {
  const errors = validateUnitFormValues(values, rules);
  onValidationErrors(errors);

  return Object.keys(errors).length > 0;
};
