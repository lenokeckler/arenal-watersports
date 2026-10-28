import type { PASSWORD_RECOVERY_FIELD } from "@/app/constants";

export type PasswordRecoveryNewPasswordFocusField =
  | typeof PASSWORD_RECOVERY_FIELD.NEW_PASSWORD
  | typeof PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD;
