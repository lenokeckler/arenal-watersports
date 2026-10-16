import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import type { PasswordRecoveryFieldChangeHandler } from "./PasswordRecoveryFieldChangeHandler.type";

export interface PasswordRecoveryResetFormValues {
  onChange: PasswordRecoveryFieldChangeHandler;
  values: PasswordRecoveryResetInput;
}
