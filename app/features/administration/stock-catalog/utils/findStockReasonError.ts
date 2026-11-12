import type { NullableUndefined } from "@/app/types";
import { STOCK_ADJUSTMENT_REASON } from "../constants/StockAdjustmentReason.constants";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import type { AdjustStockInput } from "../models/AdjustStockInput.interface";

const ALLOWED_REASONS: string[] = Object.values(
  STOCK_ADJUSTMENT_REASON
);

export const findStockReasonError = (
  input: AdjustStockInput
): NullableUndefined<string> =>
  ALLOWED_REASONS.includes(input.reason)
    ? undefined
    : STOCK_CATALOG_COPY.REASON_INVALID_ERROR;
