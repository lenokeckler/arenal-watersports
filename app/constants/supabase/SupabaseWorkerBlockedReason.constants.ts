import type { Database } from "@/app/types";

export const SUPABASE_WORKER_BLOCKED_REASON = {
  ADMINISTRATION: "administration",
  FAILED_ATTEMPTS: "failed_attempts",
} as const satisfies Record<
  string,
  Database["public"]["Enums"]["worker_blocked_reason"]
>;
