import type { WorkerRegistrationField } from "@/app/constants";

export type WorkerRegistrationFieldErrorCopy = Partial<
  Record<WorkerRegistrationField, string>
>;
