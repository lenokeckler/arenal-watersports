import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";

export type PasswordRecoveryResetResult =
  | { ok: true }
  | { ok: false; error: PasswordRecoveryError };
