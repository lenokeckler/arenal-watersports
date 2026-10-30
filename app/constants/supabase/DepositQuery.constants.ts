export const DEPOSIT_QUERY = {
  OPERATION: "fetch deposits by status",
  ORDER_COLUMN: "created_at",
  SELECT:
    "id, amount, currency, status, reservations(code, customer_name)",
  STATUS_COLUMN: "status",
  TABLE: "deposits",
} as const;
