import type { InventoryStockAdjustmentReason } from "../constants/InventoryStockAdjustment.constants";
import type { NullableRef } from "@/app/types";

export interface InventoryStockAdjustmentInput {
  available: number;
  categoryId: string;
  damaged: number;
  expiryDate: NullableRef<string>;
  inRepair: number;
  reason: InventoryStockAdjustmentReason;
}
