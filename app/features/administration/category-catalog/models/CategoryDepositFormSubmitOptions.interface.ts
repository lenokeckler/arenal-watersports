import { CategoryDepositFormErrors } from "./CategoryDepositFormErrors.interface";
import { CategoryDepositFormValues } from "./CategoryDepositFormValues.interface";

export interface CategoryDepositFormSubmitOptions {
  categoryId: string;
  values: CategoryDepositFormValues;
  onValidationErrors: (
    errors: CategoryDepositFormErrors
  ) => void;
}
