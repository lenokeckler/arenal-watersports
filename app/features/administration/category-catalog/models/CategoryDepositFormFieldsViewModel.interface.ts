import { CategoryDepositFieldHandlers } from "./CategoryDepositFieldHandlers.interface";
import { CategoryDepositFormErrors } from "./CategoryDepositFormErrors.interface";
import { CategoryDepositFormValues } from "./CategoryDepositFormValues.interface";

export interface CategoryDepositFormFieldsViewModel extends CategoryDepositFieldHandlers {
  values: CategoryDepositFormValues;
  errors: CategoryDepositFormErrors;
  showValidationErrors: (
    errors: CategoryDepositFormErrors
  ) => void;
}
