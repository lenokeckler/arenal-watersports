import {
  WORKER_REGISTRATION_ERROR_CODE,
  WORKER_REGISTRATION_FIELD,
  type WorkerRegistrationErrorCode,
  type WorkerRegistrationField,
} from "@/app/constants";

export const WORKER_REGISTRATION_REFUSAL_FIELD: Partial<
  Record<
    WorkerRegistrationErrorCode,
    WorkerRegistrationField
  >
> = {
  [WORKER_REGISTRATION_ERROR_CODE.USERNAME_TAKEN]:
    WORKER_REGISTRATION_FIELD.USERNAME,
};
