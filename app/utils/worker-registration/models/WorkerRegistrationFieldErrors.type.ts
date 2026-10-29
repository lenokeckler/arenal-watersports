import type {
  WorkerRegistrationErrorCode,
  WorkerRegistrationField,
} from "@/app/constants";

export type WorkerRegistrationFieldErrors = Partial<
  Record<
    WorkerRegistrationField,
    WorkerRegistrationErrorCode
  >
>;
