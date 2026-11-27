import { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryBehaviorLowFuelFieldProps {
  disabled?: boolean;
  error?: string;
  onChange: CategoryFormFieldChangeHandler;
  value: string;
}
