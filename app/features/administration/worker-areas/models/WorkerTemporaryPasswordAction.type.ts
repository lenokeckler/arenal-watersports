import type { WorkerTemporaryPasswordState } from "./WorkerTemporaryPasswordState.type";

export type WorkerTemporaryPasswordAction = (
  previousState: WorkerTemporaryPasswordState,
  formData: FormData
) => Promise<WorkerTemporaryPasswordState>;
