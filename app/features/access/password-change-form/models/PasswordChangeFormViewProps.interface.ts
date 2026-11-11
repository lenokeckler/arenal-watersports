import type { ReactNode } from "react";
import type { PasswordChangeErrorCopy } from "./PasswordChangeErrorCopy.type";
import type { PasswordChangeFormCopy } from "./PasswordChangeFormCopy.interface";
import type { PasswordChangeServerAction } from "./PasswordChangeServerAction.type";

export interface PasswordChangeFormViewProps {
  action: PasswordChangeServerAction;
  beforeFields?: ReactNode;
  copy: PasswordChangeFormCopy;
  errorCopy: PasswordChangeErrorCopy;
  footer?: ReactNode;
  heading: ReactNode;
}
