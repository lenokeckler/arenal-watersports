import type { ExtraOccupancyEnabledInput } from "./ExtraOccupancyEnabledInput.interface";
import type { SaveExtraOptions } from "./SaveExtraOptions.type";
import type { ShowExtraFormErrorsOptions } from "./ShowExtraFormErrorsOptions.interface";

export type ExtraFormSubmitOptions = SaveExtraOptions &
  ShowExtraFormErrorsOptions &
  ExtraOccupancyEnabledInput;
