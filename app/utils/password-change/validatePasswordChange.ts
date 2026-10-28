import {
  PASSWORD_CHANGE_ERROR_CODE,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isPasswordTooLong } from "@/app/utils/password/isPasswordTooLong";
import { createPasswordChangeError } from "./createPasswordChangeError";
import type { PasswordChangeInput } from "./models/PasswordChangeInput.interface";
import type { PasswordChangeError } from "./models/PasswordChangeError.interface";
import { validateNewPassword } from "./validateNewPassword";

export const validatePasswordChange = ({
  confirmPassword,
  currentPassword,
  newPassword,
}: PasswordChangeInput): NullableRef<PasswordChangeError> => {
  if (currentPassword === STRING.Empty) {
    return createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_REQUIRED
    );
  }

  if (isPasswordTooLong(currentPassword)) {
    return createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_TOO_LONG
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

  if (confirmPassword === STRING.Empty) {
    return createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_REQUIRED
    );
  }

  if (confirmPassword !== newPassword) {
    return createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
    );
  }

  return null;
};
