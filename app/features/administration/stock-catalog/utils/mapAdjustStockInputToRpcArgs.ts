import type { AdjustStockInput } from "../models/AdjustStockInput.interface";
import type { StockRpcArgs } from "../models/StockRpcArgs.type";

export const mapAdjustStockInputToRpcArgs = (
  input: AdjustStockInput
): StockRpcArgs => ({
  p_available: input.available,
  p_category_id: input.categoryId,
  p_damaged: input.damaged,
  p_expiry_date: input.expiryDate ?? undefined,
  p_in_repair: input.inRepair,
  p_reason: input.reason,
});
