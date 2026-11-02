import type { WorkerRegistrationState } from "./WorkerRegistrationState.type";

export type WorkerRegistrationServerAction = (
  previousState: WorkerRegistrationState,
  formData: FormData
) => Promise<WorkerRegistrationState>;
