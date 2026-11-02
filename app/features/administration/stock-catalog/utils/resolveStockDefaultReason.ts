import {
  STOCK_ADJUSTMENT_REASON,
  type StockAdjustmentReason,
} from "../constants/StockAdjustmentReason.constants";

export const resolveStockDefaultReason = (
  hasRegisteredCount: boolean
): StockAdjustmentReason =>
  hasRegisteredCount
    ? STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION
    : STOCK_ADJUSTMENT_REASON.INITIAL_COUNT;
