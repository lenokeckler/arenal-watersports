import type { PasswordChangeFocusTrigger } from "../models/PasswordChangeFocusTrigger.interface";
import type { PasswordChangeFormErrors } from "../models/PasswordChangeFormErrors.type";

export interface PasswordChangeFocusProps {
  errors: PasswordChangeFormErrors;
  trigger: PasswordChangeFocusTrigger;
}
