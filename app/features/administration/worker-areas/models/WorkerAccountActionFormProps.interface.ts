import type { WorkerAccountAction } from "@/app/constants";

export interface WorkerAccountActionFormProps {
  action: WorkerAccountAction;
  username: string;
  workerId: string;
}
