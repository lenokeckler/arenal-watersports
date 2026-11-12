import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";

export interface ExtraFormSubmitViewModel {
  isSubmitting: boolean;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
}
