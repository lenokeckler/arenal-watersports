import type { ExtraFormValuesInput } from "../../models/ExtraFormValuesInput.interface";
import type { SetNameErrorOptions } from "../../models/SetNameErrorOptions.interface";

export interface ExtraFormSubmitOverrides
  extends
    Partial<ExtraFormValuesInput>,
    Partial<SetNameErrorOptions> {}
