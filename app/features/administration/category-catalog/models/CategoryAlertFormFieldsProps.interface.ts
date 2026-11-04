import { CategoryAlertFieldHandlers } from "./CategoryAlertFieldHandlers.interface";
import { CategoryAlertFormErrors } from "./CategoryAlertFormErrors.interface";
import { CategoryAlertFormValues } from "./CategoryAlertFormValues.interface";

export interface CategoryAlertFormFieldsProps extends CategoryAlertFieldHandlers {
  values: CategoryAlertFormValues;
  errors: CategoryAlertFormErrors;
  isSubmitting: boolean;
}
