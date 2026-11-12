export const INVENTORY_STOCK_ADJUSTMENT_FIELD = {
  AVAILABLE: "available",
  DAMAGED: "damaged",
  IN_REPAIR: "inRepair",
  REASON: "reason",
} as const;

export interface InventoryStockAdjustmentFormState {
  [INVENTORY_STOCK_ADJUSTMENT_FIELD.AVAILABLE]: string;
  [INVENTORY_STOCK_ADJUSTMENT_FIELD.DAMAGED]: string;
  [INVENTORY_STOCK_ADJUSTMENT_FIELD.IN_REPAIR]: string;
  [INVENTORY_STOCK_ADJUSTMENT_FIELD.REASON]: string;
}
