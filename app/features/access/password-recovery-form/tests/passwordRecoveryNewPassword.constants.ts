import {
  PASSWORD_RECOVERY_ERROR_CODE,
  PASSWORD_RECOVERY_FIELD,
} from "@/app/constants";
import { createPasswordRecoveryError } from "@/app/utils/password-recovery/createPasswordRecoveryError";

export const NEW_PASSWORD_GRANT =
  "9a8b7c6d5e4f30211203f4e5d6c7b8a99a8b7c6d5e4f30211203f4e5d6c7b8a9";
export const NEW_PASSWORD_VALUE = "Brisa-Del-Lago-2026";

export const NEW_PASSWORD_INPUT = {
  confirmPassword: NEW_PASSWORD_VALUE,
  newPassword: NEW_PASSWORD_VALUE,
};

export const NEW_PASSWORD_FORM_ENTRIES: [string, string][] =
  [
    [
      PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
      NEW_PASSWORD_VALUE,
    ],
    [
      PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD,
      NEW_PASSWORD_VALUE,
    ],
  ];

export const RESET_EXPIRED_ERROR =
  createPasswordRecoveryError(
    PASSWORD_RECOVERY_ERROR_CODE.RESET_EXPIRED
  );

export const PASSWORD_NOT_SAVED_ERROR =
  createPasswordRecoveryError(
    PASSWORD_RECOVERY_ERROR_CODE.PASSWORD_NOT_SAVED
  );

export const MISMATCHED_CONFIRMATION = "Otra-Brisa-2026";
