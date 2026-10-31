import { SUPABASE_TABLE } from "./SupabaseTable.constants";

export const WORKER_LIST_QUERY = {
  COLUMN: {
    BASE_ROLE: "base_role",
    DELETED_AT: "deleted_at",
    EXPIRES_AT: "expires_at",
    STATUS: "status",
    WORKER_ID: "worker_id",
  },
  COUNT: "exact",
  OPERATOR: {
    EXPIRES_AT_AFTER: "gt.",
    EXPIRES_AT_BEFORE_OR_ON: "lte.",
    IS_NULL: "is.null",
    IS_NOT_NULL: "not.is.null",
    NOT_EQUAL: "neq.",
  },
  ORDER_BY: {
    FULL_NAME: "full_name",
    ID: "id",
  },
  TABLES: {
    AREAS: SUPABASE_TABLE.WORKER_AREAS,
    MARKS: SUPABASE_TABLE.WORKER_MARKS,
    WORKERS: SUPABASE_TABLE.WORKERS,
  },
  WORKER_AREAS_PROJECTION: "worker_id,area",
  WORKER_MARKS_PROJECTION: "worker_id,mark",
  WORKERS_PROJECTION:
    "id,full_name,username,base_role,is_external_guide,expires_at,status,deleted_at",
} as const;
