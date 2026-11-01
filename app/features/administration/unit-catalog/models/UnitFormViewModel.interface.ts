import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import type { UnitFieldHandlers } from "./UnitFieldHandlers.interface";
import type { UnitFormErrors } from "./UnitFormErrors.interface";
import type { UnitFormValues } from "./UnitFormValues.interface";

export interface UnitFormViewModel extends UnitFieldHandlers {
  values: UnitFormValues;
  errors: UnitFormErrors;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
}
