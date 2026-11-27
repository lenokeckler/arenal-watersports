import type { ExtraOccupancyErrors } from "./ExtraOccupancyErrors.interface";
import type { ExtraPriceErrors } from "./ExtraPriceErrors.interface";

export interface ExtraFormErrors
  extends ExtraPriceErrors, ExtraOccupancyErrors {
  name?: string;
}
