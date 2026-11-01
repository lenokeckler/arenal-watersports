import {
  PASSWORD_RECOVERY_ERROR_FIELD,
  type PasswordRecoveryErrorCode,
} from "@/app/constants";

export const isPasswordRecoveryErrorCode = (
  code: string
): code is PasswordRecoveryErrorCode =>
  Object.hasOwn(PASSWORD_RECOVERY_ERROR_FIELD, code);
