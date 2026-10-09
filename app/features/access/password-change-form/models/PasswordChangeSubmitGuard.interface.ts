import type { PasswordChangeSubmitHandler } from "./PasswordChangeSubmitHandler.type";

export interface PasswordChangeSubmitGuard {
  hasSubmitted: boolean;
  invalidSubmitCount: number;
  onSubmit: PasswordChangeSubmitHandler;
  showFailures: boolean;
}
