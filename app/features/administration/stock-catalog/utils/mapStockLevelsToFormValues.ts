import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { StockAdjustmentReason } from "../constants/StockAdjustmentReason.constants";
import type { StockFormValues } from "../models/StockFormValues.interface";
import type { StockLevels } from "../models/StockLevels.interface";

export const mapStockLevelsToFormValues = (
  levels: StockLevels,
  reason: StockAdjustmentReason
): StockFormValues => ({
  available: `${levels.available}`,
  damaged: `${levels.damaged}`,
  expiryDate: safeString(levels.expiryDate),
  inRepair: `${levels.inRepair}`,
  reason,
});
