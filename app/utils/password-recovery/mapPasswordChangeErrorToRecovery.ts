import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { createPasswordRecoveryError } from "./createPasswordRecoveryError";
import { isPasswordRecoveryErrorCode } from "./isPasswordRecoveryErrorCode";
import type { PasswordRecoveryError } from "./models/PasswordRecoveryError.interface";

export const mapPasswordChangeErrorToRecovery = ({
  code,
}: PasswordChangeError): PasswordRecoveryError =>
  createPasswordRecoveryError(
    isPasswordRecoveryErrorCode(code)
      ? code
      : PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
  );
