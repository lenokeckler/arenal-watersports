import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import {
  DEFAULT_PASSWORD_CHANGE_INPUT,
  WEAK_PASSWORD,
} from "@/app/utils/password-change/tests/passwordChange.constants";

export const WEAK_NEW_PASSWORD_INPUT: PasswordChangeInput =
  {
    ...DEFAULT_PASSWORD_CHANGE_INPUT,
    confirmPassword: WEAK_PASSWORD,
    newPassword: WEAK_PASSWORD,
  };
