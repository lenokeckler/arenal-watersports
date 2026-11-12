import type { SaveUnitOptions } from "./SaveUnitOptions.interface";
import type { UnitFormErrors } from "./UnitFormErrors.interface";

export interface UnitFormSubmitOptions extends SaveUnitOptions {
  onValidationErrors: (errors: UnitFormErrors) => void;
  setCodeError: (message: string) => void;
}
