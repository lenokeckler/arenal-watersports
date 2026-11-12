import type { WorkerRegistrationInput } from "@/app/utils/worker-registration/models/WorkerRegistrationInput.interface";
import { WORKER_REGISTRATION_EMPTY_VALUES } from "../constants/WorkerRegistrationForm.constants";

const VALUE_NAMES: readonly string[] = Object.keys(
  WORKER_REGISTRATION_EMPTY_VALUES
);

export const isWorkerRegistrationValueName = (
  name: string
): name is keyof WorkerRegistrationInput =>
  VALUE_NAMES.includes(name);
