import type {
  GrantableWorkerMark,
  WorkerAreaIntent,
} from "@/app/constants";

export interface WorkerMarkChange {
  intent: WorkerAreaIntent;
  mark: GrantableWorkerMark;
  workerId: string;
}
