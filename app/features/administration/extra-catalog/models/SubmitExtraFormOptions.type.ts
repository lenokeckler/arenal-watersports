import type { ExtraFormSubmitCallbacks } from "./ExtraFormSubmitCallbacks.interface";
import type { ExtraFormSubmitOptions } from "./ExtraFormSubmitOptions.type";

export type SubmitExtraFormOptions =
  ExtraFormSubmitOptions & ExtraFormSubmitCallbacks;
