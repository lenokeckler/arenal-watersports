import { CategoryDepositFieldHandlers } from "./CategoryDepositFieldHandlers.interface";
import { CategoryDepositFormErrors } from "./CategoryDepositFormErrors.interface";
import { CategoryDepositFormValues } from "./CategoryDepositFormValues.interface";

export interface CategoryDepositFormFieldsProps extends CategoryDepositFieldHandlers {
  values: CategoryDepositFormValues;
  errors: CategoryDepositFormErrors;
  isSubmitting: boolean;
}
