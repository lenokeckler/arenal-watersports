import type { ExtraFormValuesInput } from "../../models/ExtraFormValuesInput.interface";
import type { ShowExtraFormErrorsOptions } from "../../models/ShowExtraFormErrorsOptions.interface";

export interface ExtraFormSubmitOverrides
  extends
    Partial<ExtraFormValuesInput>,
    Partial<ShowExtraFormErrorsOptions> {}
