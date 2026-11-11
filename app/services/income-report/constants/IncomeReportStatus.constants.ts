export const INCOME_REPORT_STATUS = {
  READY: "ready",
  FAILED: "failed",
} as const;

export type IncomeReportStatus =
  (typeof INCOME_REPORT_STATUS)[keyof typeof INCOME_REPORT_STATUS];
