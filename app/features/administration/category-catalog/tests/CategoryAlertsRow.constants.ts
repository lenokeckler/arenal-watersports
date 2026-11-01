import type { CategoryAlertsRow } from "../models/CategoryAlertsRow.type";
import {
  CATEGORY_ALERT_ID,
  DEFAULT_EXPIRY_DAYS,
  DEFAULT_MIN_QUANTITY,
} from "./CategoryAlerts.constants";

export const DEFAULT_CATEGORY_ALERTS_ROW: CategoryAlertsRow =
  {
    id: CATEGORY_ALERT_ID,
    alert_min_quantity: DEFAULT_MIN_QUANTITY,
    alert_expiry_days: DEFAULT_EXPIRY_DAYS,
  };

export const buildCategoryAlertsRow = (
  overrides: Partial<CategoryAlertsRow> = {}
): CategoryAlertsRow => ({
  ...DEFAULT_CATEGORY_ALERTS_ROW,
  ...overrides,
});
