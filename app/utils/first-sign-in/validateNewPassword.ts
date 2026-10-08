import {
  FIRST_SIGN_IN_ERROR_CODE,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { isPasswordTooLong } from "@/app/utils/password/isPasswordTooLong";
import { satisfiesPasswordRules } from "@/app/utils/password/satisfiesPasswordRules";
import { createFirstSignInError } from "./createFirstSignInError";
import type { FirstSignInError } from "./models/FirstSignInError.interface";

export const validateNewPassword = (
  newPassword: string
): NullableRef<FirstSignInError> => {
  if (newPassword === STRING.Empty) {
    return createFirstSignInError(
      FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_REQUIRED
    );
  }

  if (isPasswordTooLong(newPassword)) {
    return createFirstSignInError(
      FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_TOO_LONG
    );
  }

  if (!satisfiesPasswordRules(newPassword)) {
    return createFirstSignInError(
      FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES
    );
  }

  return null;
};
