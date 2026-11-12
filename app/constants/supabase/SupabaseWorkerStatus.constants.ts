import type { Database } from "@/app/types/Database";

export const SUPABASE_WORKER_STATUS = {
  ACTIVE: "active",
  BLOCKED: "blocked",
} as const satisfies Record<
  string,
  Database["public"]["Enums"]["worker_status"]
>;
