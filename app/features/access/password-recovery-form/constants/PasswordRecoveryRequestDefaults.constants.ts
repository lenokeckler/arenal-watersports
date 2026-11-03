import {
  PASSWORD_RECOVERY_FIELD,
  STRING,
} from "@/app/constants";
import type { PasswordRecoveryRequestInput } from "@/app/utils/password-recovery/models/PasswordRecoveryRequestInput.interface";
import type { PasswordRecoveryFormErrors } from "../models/PasswordRecoveryFormErrors.type";

export const EMPTY_PASSWORD_RECOVERY_REQUEST_INPUT: PasswordRecoveryRequestInput =
  {
    username: STRING.Empty,
  };

export const NO_PASSWORD_RECOVERY_FORM_ERRORS: PasswordRecoveryFormErrors =
  {
    [PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD]: null,
    [PASSWORD_RECOVERY_FIELD.FORM]: null,
    [PASSWORD_RECOVERY_FIELD.NEW_PASSWORD]: null,
    [PASSWORD_RECOVERY_FIELD.PIN]: null,
    [PASSWORD_RECOVERY_FIELD.USERNAME]: null,
  };
