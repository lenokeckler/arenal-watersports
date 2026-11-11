import type { WorkerRegistrationServerAction } from "./WorkerRegistrationServerAction.type";

export interface WorkerRegistrationFormProps {
  action: WorkerRegistrationServerAction;
  onRegisterAnother: () => void;
}
