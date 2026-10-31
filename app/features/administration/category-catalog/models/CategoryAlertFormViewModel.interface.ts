import { CategoryAlertFieldHandlers } from "./CategoryAlertFieldHandlers.interface";
import { CategoryAlertFormErrors } from "./CategoryAlertFormErrors.interface";
import { CategoryAlertFormValues } from "./CategoryAlertFormValues.interface";
import { CategoryFormSubmitEvent } from "./CategoryFormSubmitEvent.type";

export interface CategoryAlertFormViewModel extends CategoryAlertFieldHandlers {
  values: CategoryAlertFormValues;
  errors: CategoryAlertFormErrors;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (
    event: CategoryFormSubmitEvent
  ) => Promise<void>;
}
