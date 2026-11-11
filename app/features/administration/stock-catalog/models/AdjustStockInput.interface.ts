import type { NullableRef } from "@/app/types";
import type { StockAdjustmentReason } from "../constants/StockAdjustmentReason.constants";

export interface AdjustStockInput {
  available: number;
  categoryId: string;
  damaged: number;
  expiryDate: NullableRef<string>;
  inRepair: number;
  reason: StockAdjustmentReason;
}
