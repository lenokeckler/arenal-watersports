import { SUPABASE_TABLE } from "./SupabaseTable.constants";

export const DEPOSIT_QUERY = {
  COUNT: "exact",
  OPERATION: "fetch deposits by status",
  ORDER_COLUMN: "created_at",
  RESOLVED_AT_COLUMN: "resolved_at",
  RETAINED_OPERATION: "fetch retained deposits",
  RETAINED_SELECT:
    "id, currency, status, retained_amount, retention_reason, reservations(code, customer_name)",
  SELECT:
    "id, amount, currency, status, reservations(code, customer_name)",
  STATUS_COLUMN: "status",
  TABLE: SUPABASE_TABLE.DEPOSITS,
} as const;
