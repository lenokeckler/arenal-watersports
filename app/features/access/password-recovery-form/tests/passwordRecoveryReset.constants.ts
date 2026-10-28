import {
  PASSWORD_RECOVERY_ERROR_CODE,
  STRING,
} from "@/app/constants";
import { createPasswordRecoveryError } from "@/app/utils/password-recovery/createPasswordRecoveryError";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";

export const RESET_INPUT: PasswordRecoveryPinInput = {
  pin: " 123456 ",
  username: "  Ana.Perez\t",
};

export const EMPTY_RESET_INPUT: PasswordRecoveryPinInput = {
  pin: STRING.Empty,
  username: STRING.Empty,
};

export const RESET_GRANT = "grant-from-the-pin-check";
export const LOGIN_RECOVERED_PATH =
  "/access/login?notice=password-recovered";

export const PIN_INVALID_ERROR =
  createPasswordRecoveryError(
    PASSWORD_RECOVERY_ERROR_CODE.PIN_INVALID
  );
export const PASSWORD_NOT_SAVED_ERROR =
  createPasswordRecoveryError(
    PASSWORD_RECOVERY_ERROR_CODE.PASSWORD_NOT_SAVED
  );
export const NEW_PASSWORD_RULES_ERROR =
  createPasswordRecoveryError(
    PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_RULES
  );
export const CONFIRMATION_MISMATCH_ERROR =
  createPasswordRecoveryError(
    PASSWORD_RECOVERY_ERROR_CODE.CONFIRMATION_MISMATCH
  );
export const UNKNOWN_ERROR = createPasswordRecoveryError(
  PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
);

export const RETURNED_ERRORS = [
  PIN_INVALID_ERROR,
  PASSWORD_NOT_SAVED_ERROR,
  NEW_PASSWORD_RULES_ERROR,
  CONFIRMATION_MISMATCH_ERROR,
  UNKNOWN_ERROR,
] as const;
