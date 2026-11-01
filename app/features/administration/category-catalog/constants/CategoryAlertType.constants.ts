export const CATEGORY_ALERT_TYPE = {
  BOTH: "both",
  EXPIRY: "expiry",
  NONE: "none",
  QUANTITY: "quantity",
} as const;

export type CategoryAlertType =
  (typeof CATEGORY_ALERT_TYPE)[keyof typeof CATEGORY_ALERT_TYPE];
