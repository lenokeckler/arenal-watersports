import { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";

export interface CategoryAlertFormSubmitViewModel {
  isSubmitting: boolean;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
}
