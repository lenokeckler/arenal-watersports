import type { WorkerMarkChangeState } from "./WorkerMarkChangeState.type";

export type WorkerMarkChangeServerAction = (
  previousState: WorkerMarkChangeState,
  formData: FormData
) => Promise<WorkerMarkChangeState>;
