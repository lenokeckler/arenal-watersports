import type { WorkerAccountAction } from "@/app/constants";

export interface WorkerAccountChange {
  action: WorkerAccountAction;
  workerId: string;
}
