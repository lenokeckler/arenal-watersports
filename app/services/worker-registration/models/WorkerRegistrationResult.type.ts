import type { WorkerRegistrationErrorCode } from "@/app/constants";
import type { RegisteredWorker } from "./RegisteredWorker.interface";

export type WorkerRegistrationResult =
  | { ok: true; registered: RegisteredWorker }
  | { ok: false; code: WorkerRegistrationErrorCode };
