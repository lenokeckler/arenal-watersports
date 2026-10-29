import type { PasswordRecoveryFocusTrigger } from "../models/PasswordRecoveryFocusTrigger.interface";
import type { PasswordRecoveryFormErrors } from "../models/PasswordRecoveryFormErrors.type";

export interface PasswordRecoveryFocusProps {
  errors: PasswordRecoveryFormErrors;
  trigger: PasswordRecoveryFocusTrigger;
}
