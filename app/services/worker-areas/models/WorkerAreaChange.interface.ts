import type {
  GrantableWorkerArea,
  WorkerAreaIntent,
} from "@/app/constants";

export interface WorkerAreaChange {
  area: GrantableWorkerArea;
  intent: WorkerAreaIntent;
  workerId: string;
}
