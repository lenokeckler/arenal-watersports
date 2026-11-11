import type { PasswordRecoverySubmitHandler } from "./PasswordRecoverySubmitHandler.type";

export interface PasswordRecoveryNewPasswordSubmitGuard {
  hasSubmitted: boolean;
  invalidSubmitCount: number;
  onSubmit: PasswordRecoverySubmitHandler;
  showFailures: boolean;
}
