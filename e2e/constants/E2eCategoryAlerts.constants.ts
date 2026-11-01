import { STRING } from "@/app/constants";
import type { CategoryAlertThresholdInput } from "../models/CategoryAlertThresholdInput.interface";
import type { CategoryAlertThresholds } from "../models/CategoryAlertThresholds.interface";

export const E2E_CATEGORY_ALERTS_SCREENSHOT_BASENAME =
  "us-adm-15-category-alerts";

export const E2E_CATEGORY_ALERTS_SCREENSHOT_STATE = {
  BOTH_ERROR: "both-error",
  NONE: "none",
  QUANTITY_FILLED: "quantity-filled",
} as const;

export const resolveCategoryAlertsScreenshotBasename = (
  state: string
): string =>
  `${E2E_CATEGORY_ALERTS_SCREENSHOT_BASENAME}-${state}`;

export const E2E_CATEGORY_ALERTS_BASE_NAME =
  "E2E Fixture — Avisos";

export const resolveCategoryAlertsFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_CATEGORY_ALERTS_BASE_NAME} (${projectName} · ${scenario})`;

export const E2E_ALERT_INPUT = {
  EXPIRY_DAYS: "30",
  MIN_QUANTITY: "5",
} as const;

export const E2E_ALERT_STORED = {
  EXPIRY_DAYS: 30,
  MIN_QUANTITY: 5,
} as const;

export const E2E_ALERT_NO_INPUT: CategoryAlertThresholdInput =
  {
    expiryDaysText: STRING.Empty,
    minQuantityText: STRING.Empty,
  };

export const E2E_ALERT_NONE: CategoryAlertThresholds = {
  alertExpiryDays: null,
  alertMinQuantity: null,
};

export const E2E_ALERT_QUANTITY: CategoryAlertThresholds = {
  ...E2E_ALERT_NONE,
  alertMinQuantity: E2E_ALERT_STORED.MIN_QUANTITY,
};

export const E2E_ALERT_EXPIRY: CategoryAlertThresholds = {
  ...E2E_ALERT_NONE,
  alertExpiryDays: E2E_ALERT_STORED.EXPIRY_DAYS,
};

export const E2E_ALERT_BOTH: CategoryAlertThresholds = {
  alertExpiryDays: E2E_ALERT_STORED.EXPIRY_DAYS,
  alertMinQuantity: E2E_ALERT_STORED.MIN_QUANTITY,
};
