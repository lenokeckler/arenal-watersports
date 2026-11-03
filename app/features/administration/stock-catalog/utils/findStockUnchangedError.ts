import type { NullableUndefined } from "@/app/types";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import type { AdjustStockInput } from "../models/AdjustStockInput.interface";
import type { StockLevels } from "../models/StockLevels.interface";

export const findStockUnchangedError = (
  input: AdjustStockInput,
  currentLevels: StockLevels
): NullableUndefined<string> => {
  const isUnchanged =
    input.available === currentLevels.available &&
    input.damaged === currentLevels.damaged &&
    input.inRepair === currentLevels.inRepair &&
    input.expiryDate === currentLevels.expiryDate;

  return isUnchanged
    ? STOCK_CATALOG_COPY.ADJUSTMENT_UNCHANGED_ERROR
    : undefined;
};
