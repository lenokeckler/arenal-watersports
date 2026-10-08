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
