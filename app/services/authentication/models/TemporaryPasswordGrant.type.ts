import type { WorkerAccountResult } from "@/app/constants";

export type TemporaryPasswordGrant =
  | { ok: true; temporaryPassword: string }
  | { ok: false; result: WorkerAccountResult };
