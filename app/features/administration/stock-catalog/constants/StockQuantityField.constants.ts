export const STOCK_QUANTITY_FIELD = {
  AVAILABLE: "available",
  DAMAGED: "damaged",
  IN_REPAIR: "inRepair",
} as const;

export type StockQuantityField =
  (typeof STOCK_QUANTITY_FIELD)[keyof typeof STOCK_QUANTITY_FIELD];

export const STOCK_QUANTITY_PATTERN = /^\d+$/;

export const STOCK_QUANTITY_STEP = {
  DECREASE: -1,
  INCREASE: 1,
} as const;
