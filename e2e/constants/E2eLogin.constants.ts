import { ACCESS_SCREEN_COPY } from "@/app/features/access/access-screen-shell/constants/AccessScreenCopy.constants";
import { PASSWORD_TOGGLE_COPY } from "@/app/components/field-factory/constants/PasswordToggleCopy.constants";
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

export const E2E_LOGIN_SAMPLE_PASSWORD = "Sample.2026";

export const E2E_LOGIN_COPY = {
  FORGOT_PASSWORD: LOGIN_FORM_COPY.FORGOT_PASSWORD,
  HEADING: ACCESS_SCREEN_COPY.TITLE,
  INVALID_CREDENTIALS:
    SIGN_IN_ERROR_COPY[
      SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
    ],
  PASSWORD_LABEL: LOGIN_FORM_COPY.PASSWORD_LABEL,
  PASSWORD_RECOVERED_NOTICE:
    LOGIN_FORM_COPY.PASSWORD_RECOVERED_NOTICE,
  SUBMIT: LOGIN_FORM_COPY.SUBMIT,
  USERNAME_LABEL: LOGIN_FORM_COPY.USERNAME_LABEL,
  USERNAME_REQUIRED:
    SIGN_IN_ERROR_COPY[
      SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
    ],
} as const;

export const E2E_LOGIN_TOGGLE_LABEL = PASSWORD_TOGGLE_COPY;

export const E2E_LOGIN_FIELD_ID = SIGN_IN_FIELD;

export const E2E_LOGIN_ATTRIBUTE = {
  DESCRIBED_BY: "aria-describedby",
  TYPE: "type",
} as const;

export const E2E_LOGIN_SCREENSHOT_BASENAME = {
  EMPTY_FORM: "01-login-empty-form",
  FIELD_ERRORS: "02-login-field-errors",
  WRONG_CREDENTIALS: "03-login-wrong-credentials",
  PASSWORD_VISIBLE: "04-login-password-visible",
  SIGNED_IN: "05-login-signed-in",
} as const;
