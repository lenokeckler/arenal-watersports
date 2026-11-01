import { CategoryDepositFieldHandlers } from "./CategoryDepositFieldHandlers.interface";
import { CategoryDepositFormErrors } from "./CategoryDepositFormErrors.interface";
import { CategoryDepositFormValues } from "./CategoryDepositFormValues.interface";
import { CategoryFormSubmitEvent } from "./CategoryFormSubmitEvent.type";

export interface CategoryDepositFormViewModel extends CategoryDepositFieldHandlers {
  values: CategoryDepositFormValues;
  errors: CategoryDepositFormErrors;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (
    event: CategoryFormSubmitEvent
  ) => Promise<void>;
}
