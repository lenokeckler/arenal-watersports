import { PASSWORD_TOGGLE_COPY } from "@/app/components/field-factory/constants/PasswordToggleCopy.constants";
import { PASSWORD_RULES_COPY } from "@/app/components/password-rules-checklist/constants/PasswordRulesCopy.constants";
import {
  ACCESS_SHARED_COPY,
  MAIL_ENVIRONMENT,
  NETWORK_KEY,
  PASSWORD_RECOVERY_ERROR_CODE,
  PASSWORD_RESET_PIN_MAIL_COPY,
} from "@/app/constants";
import { PASSWORD_RECOVERY_RESET_ERROR_COPY } from "@/app/features/access/password-recovery-form/constants/PasswordRecoveryResetErrorCopy.constants";
import { PASSWORD_RECOVERY_REQUEST_COPY } from "@/app/features/access/password-recovery-form/constants/PasswordRecoveryRequestCopy.constants";
import { PASSWORD_RECOVERY_RESET_COPY } from "@/app/features/access/password-recovery-form/constants/PasswordRecoveryResetCopy.constants";

export const E2E_RECOVERY_SERVER_ENV = {
  [MAIL_ENVIRONMENT.FROM_ADDRESS]:
    "recuperacion@arenal.local",
  [MAIL_ENVIRONMENT.SMTP_HOST]: "127.0.0.1",
  [MAIL_ENVIRONMENT.SMTP_PASSWORD]: "",
  [MAIL_ENVIRONMENT.SMTP_PORT]: "54325",
  [MAIL_ENVIRONMENT.SMTP_USER]: "",
  [NETWORK_KEY.SECRET_ENVIRONMENT_NAME]:
    "e2e-test-only-network-secret-0123456789abcdef",
} as const;

export const E2E_MAILPIT = {
  BASE_URL: "http://127.0.0.1:54324",
  DELETE_METHOD: "DELETE",
  MESSAGE_PATH: "/api/v1/message",
  RECIPIENT_QUERY: "to:",
  SEARCH_PATH: "/api/v1/search",
  SEARCH_PARAM: "query",
} as const;

export const E2E_MAIL_WAIT_MS = {
  ARRIVAL_TIMEOUT: 15_000,
  POLL_INTERVAL: 250,
  QUIET_WINDOW: 4_000,
} as const;

export const E2E_MAIL_ADDRESS = {
  DOMAIN: "@example.test",
  PREFIX: "e2e-recovery-",
  SUFFIX_LENGTH: 12,
} as const;

export const E2E_MAIL_LINE_BREAK = /\r?\n/;

export const E2E_RECOVERY_SCENARIO = {
  BLOCKED_BY_ADMINISTRATION: "blocked-by-administration",
  BLOCKED_BY_ATTEMPTS: "blocked-by-attempts",
  ELIGIBLE: "eligible",
  NO_EMAIL: "no-email",
  RETIRED: "retired",
  UNKNOWN: "unknown",
} as const;

export const E2E_MAILED_INELIGIBLE_SCENARIOS = [
  E2E_RECOVERY_SCENARIO.BLOCKED_BY_ATTEMPTS,
  E2E_RECOVERY_SCENARIO.BLOCKED_BY_ADMINISTRATION,
  E2E_RECOVERY_SCENARIO.RETIRED,
] as const;

export const E2E_UNADDRESSED_SCENARIOS = [
  E2E_RECOVERY_SCENARIO.UNKNOWN,
  E2E_RECOVERY_SCENARIO.NO_EMAIL,
] as const;

export const E2E_MAIL_MISSING_MESSAGE = (
  address: string
): string =>
  `no mail reached ${address}. A dev server that was already running (reuseExistingServer) may lack ${Object.keys(
    E2E_RECOVERY_SERVER_ENV
  ).join(", ")}.`;

export const E2E_RECOVERY_BLOCK = {
  ADMINISTRATION: {
    blocked_reason: "administration",
    status: "blocked",
  },
  ATTEMPTS: {
    blocked_reason: "failed_attempts",
    failed_attempts: 10,
    status: "blocked",
  },
} as const;

export const E2E_RECOVERY_COPY = {
  BACK: PASSWORD_RECOVERY_REQUEST_COPY.BACK,
  CONFIRMATION: PASSWORD_RECOVERY_RESET_COPY.CONFIRMATION,
  CONFIRM_PASSWORD_LABEL:
    PASSWORD_RECOVERY_RESET_COPY.CONFIRM_PASSWORD_LABEL,
  NEW_PASSWORD_LABEL:
    PASSWORD_RECOVERY_RESET_COPY.NEW_PASSWORD_LABEL,
  NEW_PASSWORD_RULES:
    PASSWORD_RECOVERY_RESET_ERROR_COPY[
      PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_RULES
    ],
  NO_EMAIL_NOTE:
    PASSWORD_RECOVERY_REQUEST_COPY.NO_EMAIL_NOTE,
  NOT_RECEIVED_NOTE:
    PASSWORD_RECOVERY_RESET_COPY.NOT_RECEIVED_NOTE,
  PIN_INVALID:
    PASSWORD_RECOVERY_RESET_ERROR_COPY[
      PASSWORD_RECOVERY_ERROR_CODE.PIN_INVALID
    ],
  PIN_LABEL: PASSWORD_RECOVERY_RESET_COPY.PIN_LABEL,
  REQUEST_ANOTHER_PIN:
    PASSWORD_RECOVERY_RESET_COPY.REQUEST_ANOTHER_PIN,
  REQUEST_HEADING: PASSWORD_RECOVERY_REQUEST_COPY.HEADING,
  REQUEST_SUBMIT: PASSWORD_RECOVERY_REQUEST_COPY.SUBMIT,
  RESET_HEADING: PASSWORD_RECOVERY_RESET_COPY.HEADING,
  RESET_SUBMIT: PASSWORD_RECOVERY_RESET_COPY.SUBMIT,
  RULES_TITLE: PASSWORD_RULES_COPY.TITLE,
  SHOW_PASSWORD: PASSWORD_TOGGLE_COPY.SHOW,
  USERNAME_LABEL:
    PASSWORD_RECOVERY_REQUEST_COPY.USERNAME_LABEL,
  USERNAME_REQUIRED: ACCESS_SHARED_COPY.USERNAME_REQUIRED,
} as const;

export const E2E_RECOVERY_PIN_MAIL = {
  SUBJECT: PASSWORD_RESET_PIN_MAIL_COPY.SUBJECT,
} as const;

export const E2E_RECOVERY_MAIL_COUNT = {
  ONE: 1,
} as const;
