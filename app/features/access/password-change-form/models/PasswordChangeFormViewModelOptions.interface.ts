import type { PasswordChangeErrorCopy } from "./PasswordChangeErrorCopy.type";
import type { PasswordChangeServerAction } from "./PasswordChangeServerAction.type";

export interface PasswordChangeFormViewModelOptions {
  action: PasswordChangeServerAction;
  errorCopy: PasswordChangeErrorCopy;
}
