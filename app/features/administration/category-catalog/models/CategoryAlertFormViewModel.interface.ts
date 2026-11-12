import { CategoryAlertFieldHandlers } from "./CategoryAlertFieldHandlers.interface";
import { CategoryAlertFormErrors } from "./CategoryAlertFormErrors.interface";
import { CategoryAlertFormValues } from "./CategoryAlertFormValues.interface";
import { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";

export interface CategoryAlertFormViewModel extends CategoryAlertFieldHandlers {
  values: CategoryAlertFormValues;
  errors: CategoryAlertFormErrors;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
}
