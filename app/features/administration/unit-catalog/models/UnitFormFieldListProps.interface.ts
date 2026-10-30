import type { UnitCategory } from "./UnitCategory.interface";
import type { UnitFieldHandlers } from "./UnitFieldHandlers.interface";
import type { UnitFormErrors } from "./UnitFormErrors.interface";
import type { UnitFormValues } from "./UnitFormValues.interface";

export interface UnitFormFieldListProps extends UnitFieldHandlers {
  values: UnitFormValues;
  errors: UnitFormErrors;
  category: UnitCategory;
  isDisabled: boolean;
}
