import {
  LOGIN_NOTICE,
  LOGIN_NOTICE_QUERY_PARAM,
  PATHS,
} from "@/app/constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";

export const E2E_RECOVERY_PASSWORDS = {
  COMMON: "Password1!",
  NEW: "Nueva.Prueba.2026!",
  WEAK: "abc",
} as const;

export const E2E_NEW_PASSWORDS = {
  confirmPassword: E2E_RECOVERY_PASSWORDS.NEW,
  newPassword: E2E_RECOVERY_PASSWORDS.NEW,
} as const;

export const E2E_RECOVERY_PIN_LIMITS = {
  ATTEMPTS: 5,
  BACKDATE_MS: 120_000,
  EXPIRED_AGE_MS: 660_000,
  LIFETIME_MS: 600_000,
  DIGIT_SHIFT: 1,
  FIRST_ATTEMPT: 0,
} as const;

export const E2E_RECOVERY_SCREENSHOT_BASENAME = {
  LOGIN_RECOVERED_NOTICE:
    "06-recovery-login-password-recovered",
  LOGIN_WITH_LINK: "05-recovery-login-forgot-link",
  NEW_PASSWORD_SCREEN: "07-recovery-new-password-screen",
  PIN_SCREEN: "03-recovery-pin-screen",
  PIN_SCREEN_PIN_ERROR: "04-recovery-pin-screen-pin-error",
  REQUEST_EMPTY: "01-recovery-request-empty",
  REQUEST_FIELD_ERROR: "02-recovery-request-field-error",
} as const;

export const E2E_RECOVERED_LOGIN_PATH = appendQueryParam(
  PATHS.ACCESS.LOGIN,
  LOGIN_NOTICE_QUERY_PARAM,
  LOGIN_NOTICE.PASSWORD_RECOVERED
);
