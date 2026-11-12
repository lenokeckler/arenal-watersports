import type { Database } from "@/app/types/Database";

export type WorkerListAreaRow = Pick<
  Database["public"]["Tables"]["worker_areas"]["Row"],
  "area" | "worker_id"
>;
