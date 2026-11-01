import { CategoryCreateFormErrors } from "./CategoryCreateFormErrors.interface";
import { CategoryCreateFormValues } from "./CategoryCreateFormValues.interface";
import { CategoryFormFieldChangeEvent } from "./CategoryFormFieldChangeEvent.type";

export interface CategoryCreateFormFieldsProps {
  values: CategoryCreateFormValues;
  errors: CategoryCreateFormErrors;
  isSubmitting: boolean;
  onNameChange: (
    event: CategoryFormFieldChangeEvent
  ) => void;
  onTrackingModeChange: (
    event: CategoryFormFieldChangeEvent
  ) => void;
  onGroupNameChange: (
    event: CategoryFormFieldChangeEvent
  ) => void;
}
