import type { StockFormValues } from "../models/StockFormValues.interface";
import { sumStockQuantities } from "./sumStockQuantities";
import { toCountableStockQuantity } from "./toCountableStockQuantity";

export const resolveStockFormTotal = (
  values: StockFormValues
): number =>
  sumStockQuantities(
    [values.available, values.damaged, values.inRepair].map(
      toCountableStockQuantity
    )
  );
