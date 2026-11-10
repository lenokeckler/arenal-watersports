import type { WorkerRegistration } from "./WorkerRegistration.interface";
import type { WorkerRegistrationFieldErrors } from "./WorkerRegistrationFieldErrors.type";

export type WorkerRegistrationCheck =
  | { ok: true; registration: WorkerRegistration }
  | {
      ok: false;
      fieldErrors: WorkerRegistrationFieldErrors;
    };
