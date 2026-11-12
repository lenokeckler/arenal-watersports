import { PASSWORD_CHANGE_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { validateCurrentPassword } from "@/app/utils/reauthentication/validateCurrentPassword";
import { createPasswordChangeError } from "./createPasswordChangeError";
import type { PasswordChangeInput } from "./models/PasswordChangeInput.interface";
import type { PasswordChangeError } from "./models/PasswordChangeError.interface";
import { validateNewPassword } from "./validateNewPassword";
import { validatePasswordConfirmation } from "./validatePasswordConfirmation";

export const validatePasswordChange = ({
  confirmPassword,
  currentPassword,
  newPassword,
}: PasswordChangeInput): NullableRef<PasswordChangeError> => {
  const currentPasswordErrorCode =
    validateCurrentPassword(currentPassword);

  if (currentPasswordErrorCode) {
    return createPasswordChangeError(
      currentPasswordErrorCode
    );
  }

  const newPasswordError = validateNewPassword(newPassword);

  if (newPasswordError) {
    return newPasswordError;
  }

  if (newPassword === currentPassword) {
    return createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT
    );
  }

  return validatePasswordConfirmation(
    newPassword,
    confirmPassword
  );
};
