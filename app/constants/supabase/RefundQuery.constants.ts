export const REFUND_QUERY = {
  COUNT: "exact",
  CREATED_AT_COLUMN: "created_at",
  OPERATION: "fetch refunds in range",
  SELECT: "amount, currency",
  TABLE: "refunds",
} as const;
