import type { CategoryDepositFormErrors } from "./CategoryDepositFormErrors.interface";
import type { CategoryDepositFormValues } from "./CategoryDepositFormValues.interface";
import type { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryConfigureDepositProps {
  values: CategoryDepositFormValues;
  errors: CategoryDepositFormErrors;
  onDepositUsdChange: CategoryFormFieldChangeHandler;
  onDepositCrcChange: CategoryFormFieldChangeHandler;
}
