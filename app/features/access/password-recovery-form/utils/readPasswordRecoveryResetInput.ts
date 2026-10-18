import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import { readTextField } from "@/app/utils/form-data/readTextField";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";

export const readPasswordRecoveryResetInput = (
  formData: FormData
): PasswordRecoveryResetInput => ({
  confirmPassword: readTextField(
    formData,
    PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD
  ),
  newPassword: readTextField(
    formData,
    PASSWORD_RECOVERY_FIELD.NEW_PASSWORD
  ),
  pin: readTextField(formData, PASSWORD_RECOVERY_FIELD.PIN),
  username: readTextField(
    formData,
    PASSWORD_RECOVERY_FIELD.USERNAME
  ),
});
