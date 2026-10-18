import {
  PASSWORD_RECOVERY_ERROR_CODE,
  type PasswordRecoveryErrorCode,
} from "@/app/constants";

export const PIN_CLEARING_ERROR_CODES: readonly PasswordRecoveryErrorCode[] =
  [
    PASSWORD_RECOVERY_ERROR_CODE.PIN_INVALID,
    PASSWORD_RECOVERY_ERROR_CODE.PASSWORD_NOT_SAVED,
  ];
