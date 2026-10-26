import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { PasswordRecoveryResetFocusField } from "../models/PasswordRecoveryResetFocusField.type";

export const PASSWORD_RECOVERY_RESET_FOCUS_ORDER: readonly PasswordRecoveryResetFocusField[] =
  [
    PASSWORD_RECOVERY_FIELD.USERNAME,
    PASSWORD_RECOVERY_FIELD.PIN,
  ];
