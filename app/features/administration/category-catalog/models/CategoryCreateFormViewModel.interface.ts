import { CategoryCreateFormErrors } from "./CategoryCreateFormErrors.interface";
import { CategoryCreateFormValues } from "./CategoryCreateFormValues.interface";
import { CategoryFormFieldChangeEvent } from "./CategoryFormFieldChangeEvent.type";

export interface CategoryCreateFormViewModel {
  values: CategoryCreateFormValues;
  errors: CategoryCreateFormErrors;
  isSubmitting: boolean;
  onBack: () => void;
  onNameChange: (
    event: CategoryFormFieldChangeEvent
  ) => void;
  onTrackingModeChange: (
    event: CategoryFormFieldChangeEvent
  ) => void;
  onGroupNameChange: (
    event: CategoryFormFieldChangeEvent
  ) => void;
  onSubmit: (event: React.FormEvent) => void;
}
