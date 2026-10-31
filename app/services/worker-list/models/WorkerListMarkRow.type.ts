import type { Database } from "@/app/types/Database";

export type WorkerListMarkRow = Pick<
  Database["public"]["Tables"]["worker_marks"]["Row"],
  "mark" | "worker_id"
>;
