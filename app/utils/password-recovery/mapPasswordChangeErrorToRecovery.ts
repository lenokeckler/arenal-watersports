import {
  PASSWORD_CHANGE_TO_RECOVERY_ERROR_CODE,
  PASSWORD_RECOVERY_ERROR_CODE,
} from "@/app/constants";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";
import { createPasswordRecoveryError } from "./createPasswordRecoveryError";
import type { PasswordRecoveryError } from "./models/PasswordRecoveryError.interface";

export const mapPasswordChangeErrorToRecovery = ({
  code,
}: PasswordChangeError): PasswordRecoveryError =>
  createPasswordRecoveryError(
    PASSWORD_CHANGE_TO_RECOVERY_ERROR_CODE[code] ??
      PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
  );
