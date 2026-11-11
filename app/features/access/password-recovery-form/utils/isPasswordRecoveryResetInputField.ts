import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";
import { EMPTY_PASSWORD_RECOVERY_RESET_INPUT } from "../constants/PasswordRecoveryResetDefaults.constants";

export const isPasswordRecoveryResetInputField = (
  name: string
): name is keyof PasswordRecoveryPinInput =>
  Object.hasOwn(EMPTY_PASSWORD_RECOVERY_RESET_INPUT, name);
