import type { Database } from "@/app/types/Database";

export type WorkerListWorkerRow = Pick<
  Database["public"]["Tables"]["workers"]["Row"],
  | "base_role"
  | "deleted_at"
  | "expires_at"
  | "full_name"
  | "id"
  | "is_external_guide"
  | "status"
  | "username"
>;
