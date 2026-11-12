import {
  PASSWORD_RECOVERY_ERROR_FIELD,
  type PasswordRecoveryErrorCode,
} from "@/app/constants";
import type { PasswordRecoveryError } from "./models/PasswordRecoveryError.interface";

export const createPasswordRecoveryError = (
  code: PasswordRecoveryErrorCode
): PasswordRecoveryError => ({
  code,
  field: PASSWORD_RECOVERY_ERROR_FIELD[code],
});
