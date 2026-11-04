import type { StockLevels } from "./StockLevels.interface";

export interface StockAdjustmentContext {
  currentLevels: StockLevels;
  hasExpiryAlert: boolean;
}
