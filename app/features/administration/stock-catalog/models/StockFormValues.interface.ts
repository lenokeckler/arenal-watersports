import type { StockAdjustmentReason } from "../constants/StockAdjustmentReason.constants";

export interface StockFormValues {
  available: string;
  damaged: string;
  expiryDate: string;
  inRepair: string;
  reason: StockAdjustmentReason;
}
