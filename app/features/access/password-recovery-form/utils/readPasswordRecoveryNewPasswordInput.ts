import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import { readTextField } from "@/app/utils/form-data/readTextField";
import type { PasswordRecoveryNewPasswordInput } from "@/app/utils/password-recovery/models/PasswordRecoveryNewPasswordInput.interface";

export const readPasswordRecoveryNewPasswordInput = (
  formData: FormData
): PasswordRecoveryNewPasswordInput => ({
  confirmPassword: readTextField(
    formData,
    PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD
  ),
  newPassword: readTextField(
    formData,
    PASSWORD_RECOVERY_FIELD.NEW_PASSWORD
  ),
});
