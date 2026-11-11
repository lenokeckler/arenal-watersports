import {
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import type { PasswordRecoveryNewPasswordInput } from "@/app/utils/password-recovery/models/PasswordRecoveryNewPasswordInput.interface";
import type { PasswordRecoveryNewPasswordFocusField } from "../models/PasswordRecoveryNewPasswordFocusField.type";

export const EMPTY_PASSWORD_RECOVERY_NEW_PASSWORD_INPUT: PasswordRecoveryNewPasswordInput =
  {
    confirmPassword: STRING.Empty,
    newPassword: STRING.Empty,
  };

export const PASSWORD_RECOVERY_NEW_PASSWORD_FOCUS_ORDER: readonly PasswordRecoveryNewPasswordFocusField[] =
  [
    PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
    PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD,
  ];
