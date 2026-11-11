import type { PasswordRecoveryNewPasswordInput } from "@/app/utils/password-recovery/models/PasswordRecoveryNewPasswordInput.interface";
import { EMPTY_PASSWORD_RECOVERY_NEW_PASSWORD_INPUT } from "../constants/PasswordRecoveryNewPasswordDefaults.constants";

const isNewPasswordField = (
  name: string
): name is keyof PasswordRecoveryNewPasswordInput =>
  Object.hasOwn(
    EMPTY_PASSWORD_RECOVERY_NEW_PASSWORD_INPUT,
    name
  );

export const changePasswordRecoveryNewPasswordValue = (
  values: PasswordRecoveryNewPasswordInput,
  name: string,
  value: string
): PasswordRecoveryNewPasswordInput =>
  isNewPasswordField(name)
    ? { ...values, [name]: value }
    : values;
