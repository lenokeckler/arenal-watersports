import type { ExtraFormValues } from "../../models/ExtraFormValues.interface";
import type { ExtraPriceErrors } from "../../models/ExtraPriceErrors.interface";

export interface ExtraPriceInputCase {
  description: string;
  values: Partial<ExtraFormValues>;
  expectedErrors: ExtraPriceErrors;
}
