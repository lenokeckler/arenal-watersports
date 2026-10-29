import type { RegisteredWorker } from "@/app/services/worker-registration/models/RegisteredWorker.interface";
import type { WorkerRegistrationFieldErrors } from "@/app/utils/worker-registration/models/WorkerRegistrationFieldErrors.type";
import type { WORKER_REGISTRATION_STATUS } from "../constants/WorkerRegistrationStatus.constants";

export type WorkerRegistrationState =
  | { status: typeof WORKER_REGISTRATION_STATUS.IDLE }
  | {
      status: typeof WORKER_REGISTRATION_STATUS.INVALID;
      fieldErrors: WorkerRegistrationFieldErrors;
    }
  | {
      status: typeof WORKER_REGISTRATION_STATUS.REGISTERED;
      registered: RegisteredWorker;
    };
