import type { WorkerRegistrationInput } from "@/app/utils/worker-registration/models/WorkerRegistrationInput.interface";
import type { WorkerRegistrationFieldErrorCopy } from "./WorkerRegistrationFieldErrorCopy.type";
import type { WorkerRegistrationFieldRefs } from "./WorkerRegistrationFieldRefs.type";
import type { WorkerRegistrationState } from "./WorkerRegistrationState.type";

export interface WorkerRegistrationViewModel {
  errors: WorkerRegistrationFieldErrorCopy;
  fieldRefs: WorkerRegistrationFieldRefs;
  formAction: (formData: FormData) => void;
  isPending: boolean;
  onChange: (
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  state: WorkerRegistrationState;
  values: WorkerRegistrationInput;
}
