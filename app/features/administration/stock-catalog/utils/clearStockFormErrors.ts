import type { StockFormErrors } from "../models/StockFormErrors.interface";

export const clearStockFormErrors = (
  errors: StockFormErrors,
  field: keyof StockFormErrors
): StockFormErrors => {
  const remainingErrors = { ...errors };
  delete remainingErrors[field];
  delete remainingErrors.form;

  return remainingErrors;
};
