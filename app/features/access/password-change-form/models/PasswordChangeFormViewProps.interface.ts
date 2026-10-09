import type { PasswordChangeErrorCopy } from "./PasswordChangeErrorCopy.type";
import type { PasswordChangeFormCopy } from "./PasswordChangeFormCopy.interface";
import type { PasswordChangeServerAction } from "./PasswordChangeServerAction.type";

export interface PasswordChangeFormViewProps {
  action: PasswordChangeServerAction;
  copy: PasswordChangeFormCopy;
  errorCopy: PasswordChangeErrorCopy;
}
