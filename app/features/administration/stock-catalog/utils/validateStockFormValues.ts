import type { StockAdjustmentContext } from "../models/StockAdjustmentContext.interface";
import type { StockFormErrors } from "../models/StockFormErrors.interface";
import type { StockFormValues } from "../models/StockFormValues.interface";
import { findStockQuantityFieldErrors } from "./findStockQuantityFieldErrors";
import { mapStockFormValuesToInput } from "./mapStockFormValuesToInput";
import { validateStockAdjustment } from "./validateStockAdjustment";

export const validateStockFormValues = (
  values: StockFormValues,
  categoryId: string,
  context: StockAdjustmentContext
): StockFormErrors => {
  const quantityErrors =
    findStockQuantityFieldErrors(values);
  if (Object.keys(quantityErrors).length > 0) {
    return quantityErrors;
  }

  const adjustmentError = validateStockAdjustment(
    mapStockFormValuesToInput(values, categoryId),
    context
  );

  return adjustmentError ? { form: adjustmentError } : {};
};
