import type { CategoryAlerts } from "../models/CategoryAlerts.interface";
import type { CategoryAlertsRow } from "../models/CategoryAlertsRow.type";

export const mapCategoryRowToAlerts = (
  categoryRow: CategoryAlertsRow
): CategoryAlerts => ({
  id: categoryRow.id,
  alertMinQuantity: categoryRow.alert_min_quantity,
  alertExpiryDays: categoryRow.alert_expiry_days,
});
