import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";

export interface ExtraCompatibilityUnitsSubmitViewModel {
  isSubmitting: boolean;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
}
