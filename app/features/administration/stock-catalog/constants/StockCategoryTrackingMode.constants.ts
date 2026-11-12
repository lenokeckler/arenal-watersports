export const STOCK_CATEGORY_TRACKING_MODE = {
  BY_QUANTITY: "by_quantity",
  BY_UNIT: "by_unit",
} as const;

export type StockCategoryTrackingMode =
  (typeof STOCK_CATEGORY_TRACKING_MODE)[keyof typeof STOCK_CATEGORY_TRACKING_MODE];
