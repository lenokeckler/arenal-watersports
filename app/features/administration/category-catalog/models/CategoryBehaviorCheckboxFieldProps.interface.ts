import { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryBehaviorCheckboxFieldProps {
  id: string;
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: CategoryFormFieldChangeHandler;
}
