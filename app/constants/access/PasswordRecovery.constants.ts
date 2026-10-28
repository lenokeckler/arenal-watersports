import { PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS } from "./PasswordRecoveryGrant.constants";

export const PASSWORD_RECOVERY_USERNAME_COOKIE = {
  NAME: "arenal-recovery-username",
  OPTIONS: PASSWORD_RECOVERY_GRANT_COOKIE_OPTIONS,
} as const;

export const PASSWORD_RECOVERY_FINISH_ATTEMPTS = 3;
