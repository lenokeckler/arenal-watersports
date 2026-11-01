import type { WorkerRegistrationErrorCode } from "@/app/constants";

export type WorkerAuthUserResult =
  | { ok: true; userId: string }
  | { ok: false; code: WorkerRegistrationErrorCode };
