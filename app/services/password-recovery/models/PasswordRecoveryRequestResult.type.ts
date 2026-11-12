import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";

export type PasswordRecoveryRequestResult =
  | { ok: true }
  | { ok: false; error: PasswordRecoveryError };
