import { CategoryCreateFormErrors } from "./CategoryCreateFormErrors.interface";
import { CategoryCreateFormValues } from "./CategoryCreateFormValues.interface";
import { CategoryFormFieldChangeEvent } from "./CategoryFormFieldChangeEvent.type";

export interface CategoryCreateFormFieldsProps {
  values: CategoryCreateFormValues;
  reservableChoice: string;
  errors: CategoryCreateFormErrors;
  isSubmitting: boolean;
  onNameChange: (
    event: CategoryFormFieldChangeEvent
  ) => void;
  onTrackingModeChange: (value: string) => void;
  onReservableChoiceChange: (value: string) => void;
  onGroupNameChange: (
    event: CategoryFormFieldChangeEvent
  ) => void;
}
