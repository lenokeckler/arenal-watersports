import type { PasswordRecoveryFailure } from "@/app/utils/password-recovery/models/PasswordRecoveryFailure.interface";

export type PasswordRecoveryPinResult =
  { grant: string; ok: true } | PasswordRecoveryFailure;
