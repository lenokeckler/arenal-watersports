import type { WorkerRegistration } from "@/app/utils/worker-registration/models/WorkerRegistration.interface";

export interface RegisteredWorker extends WorkerRegistration {
  temporaryPassword: string;
}
