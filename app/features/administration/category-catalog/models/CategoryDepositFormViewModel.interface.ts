import { CategoryDepositFieldHandlers } from "./CategoryDepositFieldHandlers.interface";
import { CategoryDepositFormErrors } from "./CategoryDepositFormErrors.interface";
import { CategoryDepositFormValues } from "./CategoryDepositFormValues.interface";
import { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";

export interface CategoryDepositFormViewModel extends CategoryDepositFieldHandlers {
  values: CategoryDepositFormValues;
  errors: CategoryDepositFormErrors;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
}
