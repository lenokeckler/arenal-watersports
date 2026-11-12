import type { InventoryExpiryAlertDatabaseRow } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import type { InventoryExpiryAlert } from "../models/InventoryExpiryAlert.interface";

export const EXPIRY_ALERT_ROW: InventoryExpiryAlertDatabaseRow =
  {
    alert_expiry_days: 30,
    category_id: "aaaaaaaa-0000-0000-0000-000000000002",
    category_name: "Extintor",
    days_to_expiry: 12,
    expiry_date: "2026-12-05",
    is_expired: false,
  };

export const EXPIRY_ALERT: InventoryExpiryAlert = {
  anticipationDays: 30,
  categoryId: "aaaaaaaa-0000-0000-0000-000000000002",
  categoryName: "Extintor",
  daysToExpiry: 12,
  expiryDate: "2026-12-05",
  isExpired: false,
};

export const EXPIRED_ALERT: InventoryExpiryAlert = {
  ...EXPIRY_ALERT,
  daysToExpiry: -3,
  expiryDate: "2026-11-01",
  isExpired: true,
};

export const EXPIRY_DATE_TEXT = {
  DECEMBER_FIFTH: "5 de diciembre de 2026",
  NOVEMBER_FIRST: "1 de noviembre de 2026",
} as const;
