import type { InventoryExpiryAlertDatabaseRow } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import type { InventoryExpiryAlert } from "../models/InventoryExpiryAlert.interface";

export const mapInventoryExpiryAlerts = (
  rows: InventoryExpiryAlertDatabaseRow[]
): InventoryExpiryAlert[] =>
  rows.flatMap((row) =>
    row.category_id !== null &&
    row.category_name !== null &&
    row.alert_expiry_days !== null &&
    row.days_to_expiry !== null &&
    row.expiry_date !== null &&
    row.is_expired !== null
      ? [
          {
            anticipationDays: row.alert_expiry_days,
            categoryId: row.category_id,
            categoryName: row.category_name,
            daysToExpiry: row.days_to_expiry,
            expiryDate: row.expiry_date,
            isExpired: row.is_expired,
          },
        ]
      : []
  );
