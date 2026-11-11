import type { PasswordRecoveryError } from "./PasswordRecoveryError.interface";

export interface PasswordRecoveryFailure {
  ok: false;
  error: PasswordRecoveryError;
}
