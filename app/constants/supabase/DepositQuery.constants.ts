export const DEPOSIT_QUERY = {
  TABLE: "deposits",
  SELECT:
    "id, amount, currency, status, reservations(code, customer_name)",
  STATUS_COLUMN: "status",
  ORDER_COLUMN: "created_at",
  OPERATION: "fetch deposits by status",
} as const;
