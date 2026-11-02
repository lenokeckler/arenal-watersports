import type { StockCategory } from "../models/StockCategory.interface";
import type { StockCategoryRow } from "../models/StockCategoryRow.type";

export const mapStockCategoryRowToCategory = (
  categoryRow: StockCategoryRow
): StockCategory => ({
  hasExpiryAlert: categoryRow.alert_expiry_days !== null,
  id: categoryRow.id,
  name: categoryRow.name,
  trackingMode: categoryRow.tracking_mode,
});
