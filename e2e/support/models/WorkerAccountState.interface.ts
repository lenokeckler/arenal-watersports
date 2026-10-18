import type { Database } from "@/app/types";

export interface WorkerAccountState {
  failedAttempts: number;
  mustChangePassword: boolean;
  status: Database["public"]["Enums"]["worker_status"];
}
