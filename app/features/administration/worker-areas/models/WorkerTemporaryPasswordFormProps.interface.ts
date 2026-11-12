import type { WorkerTemporaryPasswordAction } from "./WorkerTemporaryPasswordAction.type";

export interface WorkerTemporaryPasswordFormProps {
  action: WorkerTemporaryPasswordAction;
  doneMessage: string;
  isAvailable: boolean;
  label: string;
  pendingLabel: string;
  workerId: string;
}
