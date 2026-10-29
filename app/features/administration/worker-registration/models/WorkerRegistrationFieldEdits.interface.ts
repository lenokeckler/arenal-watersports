import type { WorkerRegistrationField } from "@/app/constants";
import type { WorkerRegistrationState } from "./WorkerRegistrationState.type";

export interface WorkerRegistrationFieldEdits {
  answer: WorkerRegistrationState;
  fields: readonly WorkerRegistrationField[];
}
