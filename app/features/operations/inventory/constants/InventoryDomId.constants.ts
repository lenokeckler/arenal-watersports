export const INVENTORY_DOM_ID = {
  CATEGORIES: "inventory-categories",
  CATEGORY_UNITS: (categoryId: string) =>
    `${categoryId}-inventory-units`,
  STOCK_ADJUSTMENT: "inventory-stock-adjustment",
  STOCK_ADJUSTMENT_AVAILABLE:
    "inventory-adjustment-available",
  STOCK_ADJUSTMENT_DAMAGED: "inventory-adjustment-damaged",
  STOCK_ADJUSTMENT_REPAIR: "inventory-adjustment-repair",
  STOCK_ADJUSTMENT_REASON: "inventory-adjustment-reason",
} as const;
