import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import { readTextField } from "@/app/utils/form-data/readTextField";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";

export const readPasswordChangeInput = (
  formData: FormData
): PasswordChangeInput => ({
  confirmPassword: readTextField(
    formData,
    PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD
  ),
  currentPassword: readTextField(
    formData,
    PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD
  ),
  newPassword: readTextField(
    formData,
    PASSWORD_CHANGE_FIELD.NEW_PASSWORD
  ),
});
