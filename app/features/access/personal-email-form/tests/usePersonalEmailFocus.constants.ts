import { PERSONAL_EMAIL_FIELD } from "@/app/constants";
import { NO_HANDLED_PERSONAL_EMAIL_FOCUS_TRIGGER } from "../constants/PersonalEmailFocus.constants";
import { NO_PERSONAL_EMAIL_FORM_ERRORS } from "../constants/PersonalEmailFormDefaults.constants";
import type { PersonalEmailFormErrors } from "../models/PersonalEmailFormErrors.type";
import type { PersonalEmailFocusProps } from "./PersonalEmailFocusProps.interface";
import {
  CURRENT_PASSWORD_INVALID_ERROR,
  FIELD_ERROR_TEXT,
} from "./personalEmailHooks.constants";

export const FAILED_SUBMIT_TRIGGER = {
  invalidSubmitCount: 1,
  serverError: null,
};
export const SERVER_ERROR_TRIGGER = {
  invalidSubmitCount: 0,
  serverError: CURRENT_PASSWORD_INVALID_ERROR,
};
export const BOTH_ERRORS: PersonalEmailFormErrors = {
  ...NO_PERSONAL_EMAIL_FORM_ERRORS,
  [PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD]: FIELD_ERROR_TEXT,
  [PERSONAL_EMAIL_FIELD.EMAIL]: FIELD_ERROR_TEXT,
};
export const PASSWORD_ONLY_ERRORS: PersonalEmailFormErrors =
  {
    ...NO_PERSONAL_EMAIL_FORM_ERRORS,
    [PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD]:
      FIELD_ERROR_TEXT,
  };
export const NO_ERRORS_PROPS: PersonalEmailFocusProps = {
  errors: NO_PERSONAL_EMAIL_FORM_ERRORS,
  trigger: NO_HANDLED_PERSONAL_EMAIL_FOCUS_TRIGGER,
};
