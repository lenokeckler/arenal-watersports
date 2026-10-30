import { CategoryAlertFormValues } from "./CategoryAlertFormValues.interface";
import { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryAlertTypeFieldProps {
  value: CategoryAlertFormValues["alertType"];
  disabled: boolean;
  onChange: CategoryFormFieldChangeHandler;
}
