import { STRING } from "@/app/constants";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";

const readTextField = (
  formData: FormData,
  field: string
): string => {
  const value = formData.get(field);
  return typeof value === "string" ? value : STRING.Empty;
};

export const readFirstPasswordChangeInput = (
  formData: FormData
): FirstPasswordChangeInput => ({
  confirmPassword: readTextField(
    formData,
    FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD
  ),
  currentPassword: readTextField(
    formData,
    FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD
  ),
  newPassword: readTextField(
    formData,
    FIRST_SIGN_IN_FIELD.NEW_PASSWORD
  ),
});
