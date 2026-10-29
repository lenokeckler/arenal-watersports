import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import type { PasswordChangeFocusField } from "../models/PasswordChangeFocusField.type";

export const PASSWORD_CHANGE_FOCUS_ORDER: readonly PasswordChangeFocusField[] =
  [
    PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD,
    PASSWORD_CHANGE_FIELD.NEW_PASSWORD,
    PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD,
  ];

export const NO_HANDLED_FOCUS_TRIGGER = {
  invalidSubmitCount: 0,
  serverError: null,
} as const;
