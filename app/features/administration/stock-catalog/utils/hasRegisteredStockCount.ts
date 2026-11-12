import type { StockLevels } from "../models/StockLevels.interface";

export const hasRegisteredStockCount = (
  levels: StockLevels,
  hasHistory: boolean
): boolean =>
  hasHistory ||
  levels.available + levels.damaged + levels.inRepair > 0;
