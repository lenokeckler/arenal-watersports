import type { Database } from "@/app/types";

export interface WorkerAccountState {
  failedAttempts: number;
  status: Database["public"]["Enums"]["worker_status"];
}
