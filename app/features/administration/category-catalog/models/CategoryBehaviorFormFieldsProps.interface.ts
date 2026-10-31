import { CategoryBehaviorFieldAvailability } from "./CategoryBehaviorFieldAvailability.interface";
import { CategoryBehaviorFieldHandlers } from "./CategoryBehaviorFieldHandlers.interface";
import { CategoryBehaviorFormErrors } from "./CategoryBehaviorFormErrors.interface";
import { CategoryBehaviorFormValues } from "./CategoryBehaviorFormValues.interface";

export interface CategoryBehaviorFormFieldsProps extends CategoryBehaviorFieldHandlers {
  values: CategoryBehaviorFormValues;
  errors: CategoryBehaviorFormErrors;
  availability: CategoryBehaviorFieldAvailability;
  isSubmitting: boolean;
}
