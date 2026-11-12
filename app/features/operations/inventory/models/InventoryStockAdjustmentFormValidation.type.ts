import type { InventoryStockAdjustmentReason } from "../constants/InventoryStockAdjustment.constants";

export type InventoryStockAdjustmentFormValidation =
  | {
      isValid: true;
      reason: InventoryStockAdjustmentReason;
    }
  | { error: string; isValid: false };
