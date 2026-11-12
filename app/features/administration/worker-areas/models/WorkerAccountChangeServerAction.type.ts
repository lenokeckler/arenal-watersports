import type { WorkerAccountChangeState } from "./WorkerAccountChangeState.type";

export type WorkerAccountChangeServerAction = (
  previousState: WorkerAccountChangeState,
  formData: FormData
) => Promise<WorkerAccountChangeState>;
