export const INVENTORY_DOM_ID = {
  EXPIRY_ALERTS: "inventory-expiry-alerts",
  QUANTITY_ALERTS: "inventory-quantity-alerts",
  CATEGORIES: "inventory-categories",
  CATEGORY_UNITS: (categoryId: string) =>
    `${categoryId}-inventory-units`,
  STOCK_ADJUSTMENT: "inventory-stock-adjustment",
  STOCK_MOVEMENTS: "inventory-stock-movements",
  STOCK_ADJUSTMENT_AVAILABLE:
    "inventory-adjustment-available",
  STOCK_ADJUSTMENT_DAMAGED: "inventory-adjustment-damaged",
  STOCK_ADJUSTMENT_REPAIR: "inventory-adjustment-repair",
  STOCK_ADJUSTMENT_REASON: "inventory-adjustment-reason",
} as const;
