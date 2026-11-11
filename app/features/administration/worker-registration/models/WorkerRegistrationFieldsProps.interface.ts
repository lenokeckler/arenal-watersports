import type { WorkerRegistrationFieldErrorCopy } from "./WorkerRegistrationFieldErrorCopy.type";
import type { WorkerRegistrationFieldRefs } from "./WorkerRegistrationFieldRefs.type";
import type { WorkerRegistrationInput } from "@/app/utils/worker-registration/models/WorkerRegistrationInput.interface";

export interface WorkerRegistrationFieldsProps {
  errors: WorkerRegistrationFieldErrorCopy;
  fieldRefs: WorkerRegistrationFieldRefs;
  isPending: boolean;
  onChange: (
    event: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => void;
  values: WorkerRegistrationInput;
}
