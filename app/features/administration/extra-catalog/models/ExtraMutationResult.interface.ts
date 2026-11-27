import type { ExtraMutationStatus } from "./ExtraMutationStatus.type";
import type { ExtraPriceErrors } from "./ExtraPriceErrors.interface";

export interface ExtraMutationResult {
  status: ExtraMutationStatus;
  message?: string;
  nameError?: string;
  occupancyError?: string;
  priceErrors?: ExtraPriceErrors;
}
