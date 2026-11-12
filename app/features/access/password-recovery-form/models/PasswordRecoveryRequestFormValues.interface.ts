import type { PasswordRecoveryRequestInput } from "@/app/utils/password-recovery/models/PasswordRecoveryRequestInput.interface";
import type { PasswordRecoveryFieldChangeHandler } from "./PasswordRecoveryFieldChangeHandler.type";

export interface PasswordRecoveryRequestFormValues {
  onChange: PasswordRecoveryFieldChangeHandler;
  values: PasswordRecoveryRequestInput;
}
