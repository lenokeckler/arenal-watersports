import type { PasswordRecoverySubmitHandler } from "./PasswordRecoverySubmitHandler.type";

export interface PasswordRecoveryRequestSubmitGuard {
  hasSubmitted: boolean;
  invalidSubmitCount: number;
  onSubmit: PasswordRecoverySubmitHandler;
}
