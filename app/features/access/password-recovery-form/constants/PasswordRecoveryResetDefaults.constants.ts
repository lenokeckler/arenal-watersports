import { STRING } from "@/app/constants";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";

export const EMPTY_PASSWORD_RECOVERY_RESET_INPUT: PasswordRecoveryResetInput =
  {
    confirmPassword: STRING.Empty,
    newPassword: STRING.Empty,
    pin: STRING.Empty,
    username: STRING.Empty,
  };
