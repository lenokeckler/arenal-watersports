import type { NullableUndefined } from "@/app/types";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import type { AdjustStockInput } from "../models/AdjustStockInput.interface";

const isStockQuantity = (quantity: number): boolean =>
  Number.isSafeInteger(quantity) && quantity >= 0;

export const findStockQuantityError = (
  input: AdjustStockInput
): NullableUndefined<string> =>
  [input.available, input.damaged, input.inRepair].every(
    isStockQuantity
  )
    ? undefined
    : STOCK_CATALOG_COPY.QUANTITY_INVALID_ERROR;
