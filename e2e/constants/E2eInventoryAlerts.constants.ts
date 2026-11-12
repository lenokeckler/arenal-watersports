import { INVENTORY_COPY } from "@/app/features/operations/inventory/constants/InventoryCopy.constants";

export const E2E_INVENTORY_ALERTS = {
  CATEGORY: "Chaleco",
  EXPIRY_ANTICIPATION_DAYS: 30,
  EXPIRY_CATEGORY: "Extintor",
  EXPIRY_COLUMN: "alert_expiry_days",
  EXPIRY_DETAIL:
    /Vence el .+, en \d+ días\. Se avisa 30 días antes\./,
  EXPIRY_TITLE: INVENTORY_COPY.EXPIRY_ALERTS_TITLE,
  MINIMUM: 1000,
  MINIMUM_COLUMN: "alert_min_quantity",
  QUANTITY_DETAIL: /Faltan \d+ para llegar al mínimo/,
  QUANTITY_TITLE: INVENTORY_COPY.QUANTITY_ALERTS_TITLE,
} as const;

export const E2E_INVENTORY_ALERTS_SCREENSHOT_BASENAME = {
  EXPIRY: "16-inventory-expiry-alert",
  QUANTITY: "15-inventory-quantity-alert",
} as const;
