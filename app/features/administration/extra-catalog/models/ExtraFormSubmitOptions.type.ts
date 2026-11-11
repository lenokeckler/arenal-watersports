import type { SaveExtraOptions } from "./SaveExtraOptions.type";
import type { SetNameErrorOptions } from "./SetNameErrorOptions.interface";

export type ExtraFormSubmitOptions = SaveExtraOptions &
  SetNameErrorOptions;
