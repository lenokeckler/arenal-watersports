export const STOCK_ADJUSTMENT_REASON = {
  COUNT_CORRECTION: "count_correction",
  DISCARDED: "discarded",
  INITIAL_COUNT: "initial_count",
  LOST: "lost",
} as const;

export type StockAdjustmentReason =
  (typeof STOCK_ADJUSTMENT_REASON)[keyof typeof STOCK_ADJUSTMENT_REASON];
