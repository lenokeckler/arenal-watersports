import { STOCK_QUANTITY_FIELD } from "../constants/StockQuantityField.constants";
import type { StockFormValues } from "../models/StockFormValues.interface";
import type { StockLevels } from "../models/StockLevels.interface";
import type { StockQuantityChanges } from "../models/StockQuantityChanges.type";
import { formatStockDelta } from "./formatStockDelta";
import { parseStockQuantity } from "./parseStockQuantity";

export const resolveStockQuantityChanges = (
  levels: StockLevels,
  values: StockFormValues
): StockQuantityChanges => ({
  [STOCK_QUANTITY_FIELD.AVAILABLE]: formatStockDelta(
    parseStockQuantity(values.available) - levels.available
  ),
  [STOCK_QUANTITY_FIELD.DAMAGED]: formatStockDelta(
    parseStockQuantity(values.damaged) - levels.damaged
  ),
  [STOCK_QUANTITY_FIELD.IN_REPAIR]: formatStockDelta(
    parseStockQuantity(values.inRepair) - levels.inRepair
  ),
});
