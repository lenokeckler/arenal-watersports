import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import { EMPTY_PASSWORD_RECOVERY_RESET_INPUT } from "../constants/PasswordRecoveryResetDefaults.constants";

export const isPasswordRecoveryResetInputField = (
  name: string
): name is keyof PasswordRecoveryResetInput =>
  Object.hasOwn(EMPTY_PASSWORD_RECOVERY_RESET_INPUT, name);
