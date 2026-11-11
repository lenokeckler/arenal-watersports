import { CategoryAlertFormErrors } from "./CategoryAlertFormErrors.interface";
import { CategoryAlertFormValues } from "./CategoryAlertFormValues.interface";

export interface CategoryAlertFormSubmitOptions {
  categoryId: string;
  values: CategoryAlertFormValues;
  onValidationErrors: (
    errors: CategoryAlertFormErrors
  ) => void;
}
