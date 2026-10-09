import {
  PERSONAL_EMAIL_ERROR_CODE,
  PERSONAL_EMAIL_FIELD,
  STRING,
} from "@/app/constants";
import { createPersonalEmailError } from "@/app/utils/personal-email/createPersonalEmailError";
import {
  PASSWORD,
  VALID_ADDRESS,
} from "@/app/utils/personal-email/tests/personalEmail.constants";
import type { PersonalEmailGuardProps } from "./PersonalEmailGuardProps.interface";
import type { PersonalEmailValuesProps } from "./PersonalEmailValuesProps.interface";

export const CURRENT_PASSWORD_INVALID_ERROR =
  createPersonalEmailError(
    PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
  );
export const REPEATED_CURRENT_PASSWORD_INVALID_ERROR =
  createPersonalEmailError(
    PERSONAL_EMAIL_ERROR_CODE.CURRENT_PASSWORD_INVALID
  );
export const EMAIL_INVALID_ERROR = createPersonalEmailError(
  PERSONAL_EMAIL_ERROR_CODE.EMAIL_INVALID
);
export const FIRST_INVALID_SUBMIT = 1;
export const NO_INVALID_SUBMITS = 0;
export const INITIAL_EMAIL = VALID_ADDRESS;
export const UNKNOWN_FIELD_NAME = "workerId";
export const PASSWORD_FIELD_NAME =
  PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD;
export const EMAIL_FIELD_NAME = PERSONAL_EMAIL_FIELD.EMAIL;

export const EMPTY_VALUES = {
  currentPassword: STRING.Empty,
  email: STRING.Empty,
};
export const FILLED_VALUES = {
  currentPassword: PASSWORD,
  email: INITIAL_EMAIL,
};
export const REMOVE_VALUES = {
  ...EMPTY_VALUES,
  currentPassword: PASSWORD,
};

export const IDLE_PROPS: PersonalEmailGuardProps = {
  isPending: false,
};
export const NO_SERVER_ERROR_PROPS: PersonalEmailValuesProps =
  {
    serverError: null,
  };
