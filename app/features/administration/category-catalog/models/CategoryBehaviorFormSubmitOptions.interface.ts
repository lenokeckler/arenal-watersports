import { CategoryBehaviorFormErrors } from "./CategoryBehaviorFormErrors.interface";
import { CategoryBehaviorFormValues } from "./CategoryBehaviorFormValues.interface";

export interface CategoryBehaviorFormSubmitOptions {
  categoryId: string;
  values: CategoryBehaviorFormValues;
  onValidationErrors: (
    errors: CategoryBehaviorFormErrors
  ) => void;
}
