import type { StockFieldHandlers } from "./StockFieldHandlers.interface";
import type { StockFormErrors } from "./StockFormErrors.interface";
import type { StockFormValues } from "./StockFormValues.interface";

export interface StockQuantityFieldsProps {
  disabled: boolean;
  errors: StockFormErrors;
  handlers: StockFieldHandlers;
  values: StockFormValues;
}
