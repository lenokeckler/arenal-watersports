import { STRING } from "@/app/constants";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";

export const EMPTY_PASSWORD_RECOVERY_RESET_INPUT: PasswordRecoveryPinInput =
  {
    pin: STRING.Empty,
    username: STRING.Empty,
  };
