import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import type { ComboFormErrors } from "./ComboFormErrors.interface";

export interface ComboFormSubmitViewModel {
  errors: ComboFormErrors;
  isSubmitting: boolean;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
  submitError: string;
}
