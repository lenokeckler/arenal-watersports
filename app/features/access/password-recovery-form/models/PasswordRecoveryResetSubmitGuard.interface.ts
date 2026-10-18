import type { PasswordRecoveryRequestSubmitGuard } from "./PasswordRecoveryRequestSubmitGuard.interface";

export interface PasswordRecoveryResetSubmitGuard extends PasswordRecoveryRequestSubmitGuard {
  showFailures: boolean;
}
