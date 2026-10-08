import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";

export const createFirstSignInFormData = ({
  confirmPassword,
  currentPassword,
  newPassword,
}: FirstPasswordChangeInput): FormData => {
  const formData = new FormData();
  formData.set(
    FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD,
    currentPassword
  );
  formData.set(
    FIRST_SIGN_IN_FIELD.NEW_PASSWORD,
    newPassword
  );
  formData.set(
    FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD,
    confirmPassword
  );
  return formData;
};
