import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_FIELD,
} from "@/app/constants";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import { VALID_ADDRESS } from "@/app/utils/personal-email/tests/personalEmail.constants";
import type { PersonalEmailValuesProps } from "./PersonalEmailValuesProps.interface";

export const CURRENT_PASSWORD_INVALID_ERROR =
  createPersonalEmailError(
    PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
  );
export const EMAIL_INVALID_ERROR = createPersonalEmailError(
  PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID
);
export const INITIAL_EMAIL = VALID_ADDRESS;
export const EDITED_VALUE = "otro.valor@correo.com";
export const UNKNOWN_FIELD_NAME = "workerId";
export const PASSWORD_FIELD_NAME =
  PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD;
export const EMAIL_FIELD_NAME = PERSONAL_EMAIL_FIELD.EMAIL;

export const NO_SERVER_ERROR_PROPS: PersonalEmailValuesProps =
  {
    serverError: null,
  };
