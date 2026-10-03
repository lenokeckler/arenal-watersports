import { SIGN_IN_ERROR_CODE } from "@/app/constants";
import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import { NO_SIGN_IN_FIELD_ERRORS } from "../constants/LoginFormDefaults.constants";
import { SIGN_IN_ERROR_COPY } from "../constants/SignInErrorCopy.constants";
import type { SignInFieldErrors } from "../models/SignInFieldErrors.type";

export const USERNAME_ERRORS: SignInFieldErrors = {
  ...NO_SIGN_IN_FIELD_ERRORS,
  [SIGN_IN_FIELD.USERNAME]:
    SIGN_IN_ERROR_COPY[
      SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
    ],
};

export const PASSWORD_ERRORS: SignInFieldErrors = {
  ...NO_SIGN_IN_FIELD_ERRORS,
  [SIGN_IN_FIELD.PASSWORD]:
    SIGN_IN_ERROR_COPY[
      SIGN_IN_ERROR_CODE.PASSWORD_REQUIRED
    ],
};

export const BOTH_ERRORS: SignInFieldErrors = {
  ...USERNAME_ERRORS,
  [SIGN_IN_FIELD.PASSWORD]:
    PASSWORD_ERRORS[SIGN_IN_FIELD.PASSWORD],
};

export const FORM_ERRORS: SignInFieldErrors = {
  ...NO_SIGN_IN_FIELD_ERRORS,
  [SIGN_IN_FIELD.FORM]:
    SIGN_IN_ERROR_COPY[SIGN_IN_ERROR_CODE.NETWORK],
};
