import type { WorkerRegistration } from "@/app/utils/worker-registration/models/WorkerRegistration.interface";

export interface NewWorkerRecord {
  createdBy: string;
  registration: WorkerRegistration;
  userId: string;
}
