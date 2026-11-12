import { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryAlertNumberFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: CategoryFormFieldChangeHandler;
}
