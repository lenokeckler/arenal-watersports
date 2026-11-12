import {
  PASSWORD_CHANGE_ERROR_CODE,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isPasswordTooLong } from "@/app/utils/password/isPasswordTooLong";
import { satisfiesPasswordRules } from "@/app/utils/password/satisfiesPasswordRules";
import { createPasswordChangeError } from "./createPasswordChangeError";
import type { PasswordChangeError } from "./models/PasswordChangeError.interface";

export const validateNewPassword = (
  newPassword: string
): NullableRef<PasswordChangeError> => {
  if (newPassword === STRING.Empty) {
    return createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_REQUIRED
    );
  }

  if (isPasswordTooLong(newPassword)) {
    return createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_TOO_LONG
    );
  }

  if (!satisfiesPasswordRules(newPassword)) {
    return createPasswordChangeError(
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES
    );
  }

  return null;
};
