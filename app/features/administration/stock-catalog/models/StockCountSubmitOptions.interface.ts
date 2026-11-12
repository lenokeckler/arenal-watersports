import type { StockAdjustmentContext } from "./StockAdjustmentContext.interface";
import type { StockFormErrors } from "./StockFormErrors.interface";
import type { StockFormValues } from "./StockFormValues.interface";

export interface StockCountSubmitOptions {
  categoryId: string;
  context: StockAdjustmentContext;
  onSaved: () => void;
  onValidationErrors: (errors: StockFormErrors) => void;
  values: StockFormValues;
}
