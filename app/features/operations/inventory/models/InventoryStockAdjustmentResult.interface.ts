import type { InventoryStockAdjustmentStatus } from "../constants/InventoryStockAdjustment.constants";

export interface InventoryStockAdjustmentResult {
  message?: string;
  status: InventoryStockAdjustmentStatus;
}
