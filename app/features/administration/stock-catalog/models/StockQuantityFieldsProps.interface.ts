import type { StockFieldHandlers } from "./StockFieldHandlers.interface";
import type { StockFormErrors } from "./StockFormErrors.interface";
import type { StockFormValues } from "./StockFormValues.interface";
import type { StockQuantityChanges } from "./StockQuantityChanges.type";

export interface StockQuantityFieldsProps {
  changes: StockQuantityChanges;
  disabled: boolean;
  errors: StockFormErrors;
  handlers: StockFieldHandlers;
  values: StockFormValues;
}
