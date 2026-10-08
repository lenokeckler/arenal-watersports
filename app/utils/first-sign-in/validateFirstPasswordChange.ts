import {
  FIRST_SIGN_IN_ERROR_CODE,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { createFirstSignInError } from "./createFirstSignInError";
import type { FirstPasswordChangeInput } from "./models/FirstPasswordChangeInput.interface";
import type { FirstSignInError } from "./models/FirstSignInError.interface";
import { validateNewPassword } from "./validateNewPassword";

export const validateFirstPasswordChange = ({
  confirmPassword,
  currentPassword,
  newPassword,
}: FirstPasswordChangeInput): NullableRef<FirstSignInError> => {
  if (currentPassword === STRING.Empty) {
    return createFirstSignInError(
      FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_REQUIRED
    );
  }

  const newPasswordError = validateNewPassword(newPassword);

  if (newPasswordError) {
    return newPasswordError;
  }

  if (newPassword === currentPassword) {
    return createFirstSignInError(
      FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_SAME_AS_CURRENT
    );
  }

  if (confirmPassword === STRING.Empty) {
    return createFirstSignInError(
      FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_REQUIRED
    );
  }

  if (confirmPassword !== newPassword) {
    return createFirstSignInError(
      FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_MISMATCH
    );
  }

  return null;
};
