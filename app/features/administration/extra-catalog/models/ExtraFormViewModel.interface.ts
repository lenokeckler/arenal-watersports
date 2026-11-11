import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import type { ExtraFormErrors } from "./ExtraFormErrors.interface";
import type { ExtraFormFieldChangeHandler } from "./ExtraFormFieldChangeHandler.type";
import type { ExtraFormValues } from "./ExtraFormValues.interface";

export interface ExtraFormViewModel {
  values: ExtraFormValues;
  errors: ExtraFormErrors;
  isSubmitting: boolean;
  onNameChange: ExtraFormFieldChangeHandler;
  onPriceUsdChange: ExtraFormFieldChangeHandler;
  onPriceCrcChange: ExtraFormFieldChangeHandler;
  onBack: () => void;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
}
