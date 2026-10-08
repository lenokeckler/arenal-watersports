import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants/access/FirstSignInError.constants";
import { createFirstSignInError } from "@/app/utils/first-sign-in/createFirstSignInError";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import {
  DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
  WEAK_PASSWORD,
} from "@/app/utils/first-sign-in/tests/firstSignIn.constants";

export const WEAK_NEW_PASSWORD_INPUT: FirstPasswordChangeInput =
  {
    ...DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
    confirmPassword: WEAK_PASSWORD,
    newPassword: WEAK_PASSWORD,
  };

export const CURRENT_PASSWORD_INVALID_ERROR =
  createFirstSignInError(
    FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_INVALID
  );

export const NEW_PASSWORD_RULES_ERROR =
  createFirstSignInError(
    FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES
  );

export const NETWORK_ERROR = createFirstSignInError(
  FIRST_SIGN_IN_ERROR_CODE.NETWORK
);
