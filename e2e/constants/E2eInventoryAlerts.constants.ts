import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";

export const E2E_INVENTORY_ALERTS = {
  CATEGORY: "Chaleco",
  MINIMUM: 1000,
  MINIMUM_COLUMN: "alert_min_quantity",
  QUANTITY_DETAIL: /Faltan \d+ para llegar al mínimo/,
  QUANTITY_TITLE: INVENTORY_COPY.QUANTITY_ALERTS_TITLE,
} as const;

export const E2E_INVENTORY_ALERTS_SCREENSHOT_BASENAME = {
  QUANTITY: "15-inventory-quantity-alert",
} as const;
