import type { InventoryQuantityAlertDatabaseRow } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import type { InventoryQuantityAlert } from "../models/InventoryQuantityAlert.interface";

export const mapInventoryQuantityAlerts = (
  rows: InventoryQuantityAlertDatabaseRow[]
): InventoryQuantityAlert[] =>
  rows.flatMap((row) =>
    row.category_id !== null &&
    row.category_name !== null &&
    row.alert_min_quantity !== null &&
    row.quantity_available !== null &&
    row.missing_quantity !== null
      ? [
          {
            available: row.quantity_available,
            categoryId: row.category_id,
            categoryName: row.category_name,
            minimum: row.alert_min_quantity,
            missing: row.missing_quantity,
          },
        ]
      : []
  );
