import { CategoryAlertFieldHandlers } from "./CategoryAlertFieldHandlers.interface";
import { CategoryAlertFormErrors } from "./CategoryAlertFormErrors.interface";
import { CategoryAlertFormValues } from "./CategoryAlertFormValues.interface";

export interface CategoryAlertFormFieldsViewModel extends CategoryAlertFieldHandlers {
  values: CategoryAlertFormValues;
  errors: CategoryAlertFormErrors;
  showValidationErrors: (
    errors: CategoryAlertFormErrors
  ) => void;
}
