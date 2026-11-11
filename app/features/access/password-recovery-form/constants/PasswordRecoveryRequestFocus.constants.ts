import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import type { PasswordRecoveryFocusTrigger } from "../models/PasswordRecoveryFocusTrigger.interface";
import type { PasswordRecoveryRequestFocusField } from "../models/PasswordRecoveryRequestFocusField.type";

export const PASSWORD_RECOVERY_REQUEST_FOCUS_ORDER: readonly PasswordRecoveryRequestFocusField[] =
  [PASSWORD_RECOVERY_FIELD.USERNAME];

export const NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER: PasswordRecoveryFocusTrigger =
  {
    invalidSubmitCount: 0,
    serverError: null,
  };
