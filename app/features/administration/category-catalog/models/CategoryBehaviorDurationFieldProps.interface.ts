import { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryBehaviorDurationFieldProps {
  value: string;
  error?: string;
  disabled: boolean;
  onChange: CategoryFormFieldChangeHandler;
}
