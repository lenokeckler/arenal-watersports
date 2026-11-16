import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import type { ExtraFormErrors } from "./ExtraFormErrors.interface";
import type { ExtraFormFieldChangeHandler } from "./ExtraFormFieldChangeHandler.type";
import type { ExtraFormValues } from "./ExtraFormValues.interface";
import type { ExtraOccupancyCategoryOption } from "./ExtraOccupancyCategoryOption.interface";

export interface ExtraFormViewModel {
  values: ExtraFormValues;
  errors: ExtraFormErrors;
  isSubmitting: boolean;
  isOccupancyEnabled: boolean;
  isOccupancyDisabled: boolean;
  isOccupancyLocked: boolean;
  hasOccupiableCategories: boolean;
  occupancyCategoryOptions: ExtraOccupancyCategoryOption[];
  onNameChange: ExtraFormFieldChangeHandler;
  onPriceUsdChange: ExtraFormFieldChangeHandler;
  onPriceCrcChange: ExtraFormFieldChangeHandler;
  onOccupancyToggle: ExtraFormFieldChangeHandler;
  onOccupiesCategoryChange: ExtraFormFieldChangeHandler;
  onOccupiesQuantityChange: ExtraFormFieldChangeHandler;
  onBack: () => void;
  onSubmit: (event: FormSubmitEvent) => Promise<void>;
}
