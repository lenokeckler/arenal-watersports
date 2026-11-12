import type { StockLevels } from "../models/StockLevels.interface";

export const STOCK_EMPTY_LEVELS: StockLevels = {
  available: 0,
  damaged: 0,
  expiryDate: null,
  inRepair: 0,
};
