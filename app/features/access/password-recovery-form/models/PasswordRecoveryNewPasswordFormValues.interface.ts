import type { PasswordRecoveryNewPasswordInput } from "@/app/utils/password-recovery/models/PasswordRecoveryNewPasswordInput.interface";
import type { PasswordRecoveryFieldChangeHandler } from "./PasswordRecoveryFieldChangeHandler.type";

export interface PasswordRecoveryNewPasswordFormValues {
  onChange: PasswordRecoveryFieldChangeHandler;
  values: PasswordRecoveryNewPasswordInput;
}
