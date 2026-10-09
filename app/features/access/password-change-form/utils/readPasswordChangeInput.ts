import { STRING } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";

const readTextField = (
  formData: FormData,
  field: string
): string => {
  const value = formData.get(field);
  return typeof value === "string" ? value : STRING.Empty;
};

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
