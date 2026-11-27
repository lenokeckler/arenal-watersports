import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import type { TariffFormErrors } from "./TariffFormErrors.interface";

export interface TariffFormSubmitViewModel {
  errors: TariffFormErrors;
  isSubmitting: boolean;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
  submitError: string;
}
