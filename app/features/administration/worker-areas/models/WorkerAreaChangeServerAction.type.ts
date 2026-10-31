import type { WorkerAreaChangeState } from "./WorkerAreaChangeState.type";

export type WorkerAreaChangeServerAction = (
  previousState: WorkerAreaChangeState,
  formData: FormData
) => Promise<WorkerAreaChangeState>;
