import type { InventoryQuantityAlertDatabaseRow } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import type { InventoryQuantityAlert } from "../models/InventoryQuantityAlert.interface";

export const QUANTITY_ALERT_TEST = {
  DATABASE_ERROR: {
    code: "42501",
    message: "permission denied",
  },
} as const;

export const QUANTITY_ALERT_ROW: InventoryQuantityAlertDatabaseRow =
  {
    alert_min_quantity: 10,
    category_id: "aaaaaaaa-0000-0000-0000-000000000001",
    category_name: "Chaleco",
    missing_quantity: 4,
    quantity_available: 6,
  };

export const QUANTITY_ALERT: InventoryQuantityAlert = {
  available: 6,
  categoryId: "aaaaaaaa-0000-0000-0000-000000000001",
  categoryName: "Chaleco",
  minimum: 10,
  missing: 4,
};
