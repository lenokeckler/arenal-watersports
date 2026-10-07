import { LOGIN_FORM_COPY } from "@/app/features/access/login-form/constants/LoginFormCopy.constants";
import { SIGN_IN_ERROR_COPY } from "@/app/features/access/login-form/constants/SignInErrorCopy.constants";
import {
  SIGN_IN_ERROR_CODE,
  SIGN_IN_FIELD,
} from "@/app/constants";

export const E2E_LOGIN_ACCOUNT = {
  PASSWORD: "Arenal.2026",
  USERNAME: "admin",
} as const;

export const E2E_LOGIN_WRONG_PASSWORD = "Wrong.2026";

export const E2E_LOGIN_COPY = {
  INVALID_CREDENTIALS:
    SIGN_IN_ERROR_COPY[
      SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
    ],
  PASSWORD_LABEL: LOGIN_FORM_COPY.PASSWORD_LABEL,
  SUBMIT: LOGIN_FORM_COPY.SUBMIT,
  USERNAME_LABEL: LOGIN_FORM_COPY.USERNAME_LABEL,
} as const;

export const E2E_LOGIN_FIELD_ID = SIGN_IN_FIELD;
