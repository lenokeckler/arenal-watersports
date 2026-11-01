import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import type { CategoryAlerts } from "../models/CategoryAlerts.interface";
import type { UpdateCategoryAlertsInput } from "../models/UpdateCategoryAlertsInput.interface";

export const CATEGORY_ALERT_ID = "category-alert-id";
export const FAKE_ALERT_ADMIN_WORKER_ID =
  "fake-alert-admin-worker-id";
export const ALERT_ROW_COLUMNS = [
  "alert_expiry_days",
  "alert_min_quantity",
  "updated_by",
];
export const ALERT_SELECTION =
  "id, alert_min_quantity, alert_expiry_days";

export const DEFAULT_MIN_QUANTITY = 5;
export const DEFAULT_EXPIRY_DAYS = 30;
const DEFAULT_MIN_QUANTITY_TEXT = "5";
const DEFAULT_EXPIRY_DAYS_TEXT = "30";

export const DEFAULT_CATEGORY_ALERTS: CategoryAlerts = {
  id: CATEGORY_ALERT_ID,
  alertMinQuantity: DEFAULT_MIN_QUANTITY,
  alertExpiryDays: DEFAULT_EXPIRY_DAYS,
};

export const DEFAULT_CATEGORY_ALERT_FORM_VALUES: CategoryAlertFormValues =
  {
    alertType: CATEGORY_ALERT_TYPE.BOTH,
    minQuantityText: DEFAULT_MIN_QUANTITY_TEXT,
    expiryDaysText: DEFAULT_EXPIRY_DAYS_TEXT,
  };

export const DEFAULT_UPDATE_CATEGORY_ALERTS_INPUT: UpdateCategoryAlertsInput =
  {
    categoryId: CATEGORY_ALERT_ID,
    alertMinQuantity: DEFAULT_MIN_QUANTITY,
    alertExpiryDays: DEFAULT_EXPIRY_DAYS,
  };

export const buildCategoryAlerts = (
  overrides: Partial<CategoryAlerts> = {}
): CategoryAlerts => ({
  ...DEFAULT_CATEGORY_ALERTS,
  ...overrides,
});

export const buildCategoryAlertFormValues = (
  overrides: Partial<CategoryAlertFormValues> = {}
): CategoryAlertFormValues => ({
  ...DEFAULT_CATEGORY_ALERT_FORM_VALUES,
  ...overrides,
});

export const buildUpdateCategoryAlertsInput = (
  overrides: Partial<UpdateCategoryAlertsInput> = {}
): UpdateCategoryAlertsInput => ({
  ...DEFAULT_UPDATE_CATEGORY_ALERTS_INPUT,
  ...overrides,
});

export const INPUT_WITHOUT_ALERTS = {
  categoryId: CATEGORY_ALERT_ID,
} as UpdateCategoryAlertsInput;
