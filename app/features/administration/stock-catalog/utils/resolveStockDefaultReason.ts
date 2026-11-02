import {
  STOCK_ADJUSTMENT_REASON,
  type StockAdjustmentReason,
} from "../constants/StockAdjustmentReason.constants";

export const resolveStockDefaultReason = (
  hasHistory: boolean
): StockAdjustmentReason =>
  hasHistory
    ? STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION
    : STOCK_ADJUSTMENT_REASON.INITIAL_COUNT;
