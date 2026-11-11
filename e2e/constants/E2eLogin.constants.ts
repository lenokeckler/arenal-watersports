import { ACCESS_SCREEN_COPY } from "@/app/features/access/access-screen-shell/constants/AccessScreenCopy.constants";
import { PASSWORD_TOGGLE_COPY } from "@/app/components/field-factory/constants/PasswordToggleCopy.constants";
import { LOGIN_FORM_COPY } from "@/app/features/access/login-form/constants/LoginFormCopy.constants";
import { SIGN_IN_ERROR_COPY } from "@/app/features/access/login-form/constants/SignInErrorCopy.constants";
import {
  LOGIN_NOTICE,
  LOGIN_NOTICE_QUERY_PARAM,
  PATHS,
  SIGN_IN_ERROR_CODE,
  SIGN_IN_FIELD,
  SIGN_IN_NOTICE_REASON,
} from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";

export const E2E_LOGIN_ACCOUNT = {
  EMAIL: "admin@arenal.local",
  PASSWORD: "Arenal.2026",
  USERNAME: "admin",
} as const;

export const E2E_LOGIN_SEEDED_PASSWORD =
  E2E_LOGIN_ACCOUNT.PASSWORD;

export const E2E_LOGIN_BLOCKED_ACCOUNT = {
  BY_ADMINISTRATION: "bloqueo_admin",
  BY_ATTEMPTS: "bloqueo_intentos",
} as const;

export const E2E_LOGIN_UNKNOWN_USERNAME = "no_existe_2026";

export const E2E_LOGIN_NOTICE_REASON = {
  INACTIVE: SIGN_IN_NOTICE_REASON.INACTIVE,
  SCRIPT: "<script>window.__noticeInjected=true</script>",
  UNKNOWN: "unrecognised",
} as const;

export const E2E_LOGIN_WRONG_PASSWORD = "Wrong.2026";

export const E2E_LOGIN_SAMPLE_PASSWORD = "Sample.2026";

export const E2E_LOGIN_COPY = {
  ACCOUNT_RECOVERY_REQUIRED:
    SIGN_IN_ERROR_COPY[
      SIGN_IN_ERROR_CODE.ACCOUNT_RECOVERY_REQUIRED
    ],
  FORGOT_PASSWORD: LOGIN_FORM_COPY.FORGOT_PASSWORD,
  HEADING: ACCESS_SCREEN_COPY.TITLE,
  BLOCKED_BY_ADMINISTRATION:
    SIGN_IN_ERROR_COPY[
      SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ADMINISTRATION
    ],
  BLOCKED_BY_ATTEMPTS:
    SIGN_IN_ERROR_COPY[
      SIGN_IN_ERROR_CODE.ACCOUNT_BLOCKED_BY_ATTEMPTS
    ],
  INACTIVITY_NOTICE:
    SIGN_IN_ERROR_COPY[SIGN_IN_ERROR_CODE.SESSION_INACTIVE],
  INVALID_CREDENTIALS:
    SIGN_IN_ERROR_COPY[
      SIGN_IN_ERROR_CODE.INVALID_CREDENTIALS
    ],
  PASSWORD_LABEL: LOGIN_FORM_COPY.PASSWORD_LABEL,
  PASSWORD_RECOVERED_NOTICE:
    LOGIN_FORM_COPY.PASSWORD_RECOVERED_NOTICE,
  RECOVER_PASSWORD: LOGIN_FORM_COPY.RECOVER_PASSWORD,
  SESSION_IDLE_NOTICE: LOGIN_FORM_COPY.SESSION_IDLE_NOTICE,
  SIGNED_OUT_NOTICE: LOGIN_FORM_COPY.SIGNED_OUT_NOTICE,
  SUBMIT: LOGIN_FORM_COPY.SUBMIT,
  USERNAME_LABEL: LOGIN_FORM_COPY.USERNAME_LABEL,
  USERNAME_REQUIRED:
    SIGN_IN_ERROR_COPY[
      SIGN_IN_ERROR_CODE.USERNAME_REQUIRED
    ],
} as const;

export const E2E_SIGNED_OUT_LOGIN_PATH = appendQueryParam(
  PATHS.ACCESS.LOGIN,
  LOGIN_NOTICE_QUERY_PARAM,
  LOGIN_NOTICE.SIGNED_OUT
);

export const E2E_SESSION_IDLE_LOGIN_PATH = appendQueryParam(
  PATHS.ACCESS.LOGIN,
  LOGIN_NOTICE_QUERY_PARAM,
  LOGIN_NOTICE.SESSION_IDLE
);

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
  BLOCKED_BY_ATTEMPTS: "06-login-blocked-by-attempts",
  BLOCKED_BY_ADMINISTRATION:
    "07-login-blocked-by-administration",
  GENERIC_CREDENTIALS: "08-login-generic-credentials",
  INACTIVITY_NOTICE: "09-login-inactivity-notice",
  SESSION_IDLE: "10-login-session-idle",
} as const;

export const E2E_LOGIN_TOGGLE_MIN_SIZE_PX = 48;
