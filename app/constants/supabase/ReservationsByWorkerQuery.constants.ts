import { SUPABASE_TABLE } from "./SupabaseTable.constants";

export const RESERVATIONS_BY_WORKER_QUERY = {
  COUNT: "exact",
  ORDER_BY: {
    CREATED_AT: "created_at",
    ID: "id",
  },
  OUT_OF_RANGE_ERROR: "PGRST103",
  PROJECTION:
    "id,code,customer_name,worker:workers!reservations_created_by_fkey(full_name)",
  TABLE: SUPABASE_TABLE.RESERVATIONS,
} as const;

export const RESERVATIONS_BY_WORKER_OPERATION =
  "read reservations by worker";
