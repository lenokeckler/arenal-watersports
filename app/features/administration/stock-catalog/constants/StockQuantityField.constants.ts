export const STOCK_QUANTITY_FIELD = {
  AVAILABLE: "available",
  DAMAGED: "damaged",
  IN_REPAIR: "inRepair",
} as const;

export const STOCK_QUANTITY_PATTERN = /^\d+$/;
