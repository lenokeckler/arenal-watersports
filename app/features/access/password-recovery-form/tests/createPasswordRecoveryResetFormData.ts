import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";

export const createPasswordRecoveryResetFormData = (
  input: PasswordRecoveryPinInput
): FormData => {
  const formData = new FormData();
  formData.set(
    PASSWORD_RECOVERY_FIELD.USERNAME,
    input.username
  );
  formData.set(PASSWORD_RECOVERY_FIELD.PIN, input.pin);
  return formData;
};
