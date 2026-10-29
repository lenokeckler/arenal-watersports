import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import { readTextField } from "@/app/utils/form-data/readTextField";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";

export const readPasswordRecoveryResetInput = (
  formData: FormData
): PasswordRecoveryPinInput => ({
  pin: readTextField(formData, PASSWORD_RECOVERY_FIELD.PIN),
  username: readTextField(
    formData,
    PASSWORD_RECOVERY_FIELD.USERNAME
  ),
});
