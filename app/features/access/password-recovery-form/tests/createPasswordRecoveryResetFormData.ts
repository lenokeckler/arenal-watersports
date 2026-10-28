import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";

export const createPasswordRecoveryResetFormData = (
  input: PasswordRecoveryResetInput
): FormData => {
  const formData = new FormData();
  formData.set(
    PASSWORD_RECOVERY_FIELD.USERNAME,
    input.username
  );
  formData.set(PASSWORD_RECOVERY_FIELD.PIN, input.pin);
  formData.set(
    PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
    input.newPassword
  );
  formData.set(
    PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD,
    input.confirmPassword
  );
  return formData;
};
