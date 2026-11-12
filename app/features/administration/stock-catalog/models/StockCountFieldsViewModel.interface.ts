import type { StockFieldHandlers } from "./StockFieldHandlers.interface";
import type { StockFormErrors } from "./StockFormErrors.interface";
import type { StockFormValues } from "./StockFormValues.interface";

export interface StockCountFieldsViewModel {
  errors: StockFormErrors;
  handlers: StockFieldHandlers;
  markSaved: () => void;
  showValidationErrors: (errors: StockFormErrors) => void;
  values: StockFormValues;
}
