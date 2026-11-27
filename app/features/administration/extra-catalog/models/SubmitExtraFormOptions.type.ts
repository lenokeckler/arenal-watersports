import type { ExtraFormSubmitCallbacks } from "./ExtraFormSubmitCallbacks.interface";
import type { SaveExtraOptions } from "./SaveExtraOptions.type";
import type { ShowExtraFormErrorsOptions } from "./ShowExtraFormErrorsOptions.interface";

export type SubmitExtraFormOptions = SaveExtraOptions &
  ShowExtraFormErrorsOptions &
  ExtraFormSubmitCallbacks;
