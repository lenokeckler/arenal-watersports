import type { UnitFieldHandlers } from "./UnitFieldHandlers.interface";
import type { UnitFormErrors } from "./UnitFormErrors.interface";
import type { UnitFormValues } from "./UnitFormValues.interface";

export interface UnitFormFieldsViewModel extends UnitFieldHandlers {
  values: UnitFormValues;
  errors: UnitFormErrors;
  showValidationErrors: (errors: UnitFormErrors) => void;
  setCodeError: (message: string) => void;
}
