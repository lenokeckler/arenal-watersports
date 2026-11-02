import { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";

export interface CategoryDepositFormSubmitViewModel {
  isSubmitting: boolean;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
}
