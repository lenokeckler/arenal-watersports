import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";
import type { PasswordRecoveryFieldChangeHandler } from "./PasswordRecoveryFieldChangeHandler.type";

export interface PasswordRecoveryResetFormValues {
  onChange: PasswordRecoveryFieldChangeHandler;
  values: PasswordRecoveryPinInput;
}
