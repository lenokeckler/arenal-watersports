import { STRING } from "@/app/constants";
import type { AdjustStockInput } from "../models/AdjustStockInput.interface";
import type { StockFormValues } from "../models/StockFormValues.interface";
import { parseStockQuantity } from "./parseStockQuantity";

export const mapStockFormValuesToInput = (
  values: StockFormValues,
  categoryId: string
): AdjustStockInput => {
  const expiryDate = values.expiryDate.trim();

  return {
    available: parseStockQuantity(values.available),
    categoryId,
    damaged: parseStockQuantity(values.damaged),
    expiryDate:
      expiryDate === STRING.Empty ? null : expiryDate,
    inRepair: parseStockQuantity(values.inRepair),
    reason: values.reason,
  };
};
