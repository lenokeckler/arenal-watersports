import type { PASSWORD_RECOVERY_FIELD } from "@/app/constants";

export type PasswordRecoveryResetFocusField =
  | typeof PASSWORD_RECOVERY_FIELD.USERNAME
  | typeof PASSWORD_RECOVERY_FIELD.PIN;
