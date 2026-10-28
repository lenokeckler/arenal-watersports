import { PASSWORD_RECOVERY_FIELD } from "@/app/constants";
import { NO_PASSWORD_RECOVERY_FORM_ERRORS } from "../constants/PasswordRecoveryRequestDefaults.constants";
import { NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER } from "../constants/PasswordRecoveryRequestFocus.constants";
import type { PasswordRecoveryFocusTrigger } from "../models/PasswordRecoveryFocusTrigger.interface";
import type { PasswordRecoveryFormErrors } from "../models/PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryFocusProps } from "./PasswordRecoveryFocusProps.interface";
import {
  FIELD_ERROR_TEXT,
  UNKNOWN_ERROR,
  USERNAME_REQUIRED_ERROR,
} from "./passwordRecoveryRequest.constants";

export const USERNAME_ERRORS: PasswordRecoveryFormErrors = {
  ...NO_PASSWORD_RECOVERY_FORM_ERRORS,
  [PASSWORD_RECOVERY_FIELD.USERNAME]: FIELD_ERROR_TEXT,
};
export const FORM_ERRORS: PasswordRecoveryFormErrors = {
  ...NO_PASSWORD_RECOVERY_FORM_ERRORS,
  [PASSWORD_RECOVERY_FIELD.FORM]: FIELD_ERROR_TEXT,
};
export const NO_ERRORS_PROPS: PasswordRecoveryFocusProps = {
  errors: NO_PASSWORD_RECOVERY_FORM_ERRORS,
  trigger: NO_HANDLED_PASSWORD_RECOVERY_FOCUS_TRIGGER,
};
export const FAILED_SUBMIT_TRIGGER: PasswordRecoveryFocusTrigger =
  {
    invalidSubmitCount: 1,
    serverError: null,
  };
export const BANNER_ERROR_TRIGGER: PasswordRecoveryFocusTrigger =
  {
    invalidSubmitCount: 0,
    serverError: UNKNOWN_ERROR,
  };
export const SERVER_USERNAME_ERROR_TRIGGER: PasswordRecoveryFocusTrigger =
  {
    invalidSubmitCount: 0,
    serverError: USERNAME_REQUIRED_ERROR,
  };
