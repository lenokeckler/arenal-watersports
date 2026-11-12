import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import { readTextField } from "@/app/utils/form-data/readTextField";
import type { PasswordRecoveryRequestInput } from "@/app/utils/password-recovery/models/PasswordRecoveryRequestInput.interface";

export const readPasswordRecoveryRequestInput = (
  formData: FormData
): PasswordRecoveryRequestInput => ({
  username: readTextField(
    formData,
    PASSWORD_RECOVERY_FIELD.USERNAME
  ),
});
