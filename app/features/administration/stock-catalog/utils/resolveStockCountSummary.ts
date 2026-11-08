import type { StockCountSummary } from "../models/StockCountSummary.interface";
import type { StockFormValues } from "../models/StockFormValues.interface";
import type { StockLevels } from "../models/StockLevels.interface";
import { formatStockValueChange } from "./formatStockValueChange";
import { resolveStockFormTotal } from "./resolveStockFormTotal";
import { sumStockQuantities } from "./sumStockQuantities";
import { toCountableStockQuantity } from "./toCountableStockQuantity";

export const resolveStockCountSummary = (
  levels: StockLevels,
  values: StockFormValues
): StockCountSummary => ({
  attention: sumStockQuantities([
    toCountableStockQuantity(values.damaged),
    toCountableStockQuantity(values.inRepair),
  ]),
  available: toCountableStockQuantity(values.available),
  totalText: formatStockValueChange(
    sumStockQuantities([
      levels.available,
      levels.damaged,
      levels.inRepair,
    ]),
    resolveStockFormTotal(values)
  ),
});
