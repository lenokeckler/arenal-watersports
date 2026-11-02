import type { StockFormValues } from "../models/StockFormValues.interface";
import { parseStockQuantity } from "./parseStockQuantity";

const toCountableQuantity = (text: string): number => {
  const quantity = parseStockQuantity(text);

  return Number.isNaN(quantity) ? 0 : quantity;
};

export const resolveStockFormTotal = (
  values: StockFormValues
): number =>
  [values.available, values.damaged, values.inRepair]
    .map(toCountableQuantity)
    .reduce((total, quantity) => total + quantity, 0);
