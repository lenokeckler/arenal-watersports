import {
  PASSWORD_CHANGE_ERROR_CODE,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { createPasswordChangeError } from "./createPasswordChangeError";
import type { PasswordChangeError } from "./models/PasswordChangeError.interface";

export const validatePasswordConfirmation = (
  newPassword: string,
  confirmPassword: string
): NullableRef<PasswordChangeError> => {
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
