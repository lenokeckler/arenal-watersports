import type { RegisteredWorker } from "@/app/services/worker-registration/models/RegisteredWorker.interface";

export interface WorkerRegisteredResultProps {
  onRegisterAnother: () => void;
  registered: RegisteredWorker;
}
