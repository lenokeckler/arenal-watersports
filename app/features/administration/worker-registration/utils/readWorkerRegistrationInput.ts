import { WORKER_REGISTRATION_FIELD } from "@/app/constants";
import { readTextField } from "@/app/utils/form-data/readTextField";
import type { WorkerRegistrationInput } from "@/app/utils/worker-registration/models/WorkerRegistrationInput.interface";

export const readWorkerRegistrationInput = (
  formData: FormData
): WorkerRegistrationInput => ({
  baseRole: readTextField(
    formData,
    WORKER_REGISTRATION_FIELD.BASE_ROLE
  ),
  fullName: readTextField(
    formData,
    WORKER_REGISTRATION_FIELD.FULL_NAME
  ),
  username: readTextField(
    formData,
    WORKER_REGISTRATION_FIELD.USERNAME
  ),
});
