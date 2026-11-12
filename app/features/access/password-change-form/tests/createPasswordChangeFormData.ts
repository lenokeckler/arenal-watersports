import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";

export const createPasswordChangeFormData = ({
  confirmPassword,
  currentPassword,
  newPassword,
}: PasswordChangeInput): FormData => {
  const formData = new FormData();
  formData.set(
    PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD,
    currentPassword
  );
  formData.set(
    PASSWORD_CHANGE_FIELD.NEW_PASSWORD,
    newPassword
  );
  formData.set(
    PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD,
    confirmPassword
  );
  return formData;
};
