export const CATEGORY_ALERT_ISSUE = {
  NOT_INTEGER: "not_integer",
  NOT_POSITIVE: "not_positive",
  REQUIRED: "required",
  TOO_LARGE: "too_large",
} as const;

export type CategoryAlertIssue =
  (typeof CATEGORY_ALERT_ISSUE)[keyof typeof CATEGORY_ALERT_ISSUE];
