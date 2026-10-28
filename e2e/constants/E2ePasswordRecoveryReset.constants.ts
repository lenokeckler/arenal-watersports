import {
  LOGIN_NOTICE_QUERY_PARAM,
  PASSWORD_CHANGED_MAIL_COPY,
  PASSWORD_RECOVERY_FIELD,
} from "@/app/constants";

export const E2E_RECOVERY_RESET_PASSWORDS = {
  FIRST: "Primera.Prueba.2026!",
  SECOND: "Segunda.Prueba.2026!",
} as const;

export const E2E_RECOVERY_RESET_FAILED_ATTEMPTS = 4;

export const E2E_PASSWORD_CHANGED_MAIL = {
  LINK_PATTERN: /https?:\/\/|www\./i,
  SUBJECT: PASSWORD_CHANGED_MAIL_COPY.SUBJECT,
} as const;

export const E2E_RECOVERY_OUTCOME = {
  ACCEPTED: "accepted",
  REFUSED: "refused",
} as const;

export const E2E_RECOVERY_ADDRESS_ERROR = {
  MISSING: "the recovery account has no personal email",
  OPERATION: "read the recovery address",
} as const;

export const E2E_MUST_CHANGE_PASSWORD_OPERATION =
  "set the worker must change password flag";

export const E2E_NOTICE_MAIL_ERROR = {
  MISSING: (address: string, subject: string): string =>
    `no mail with subject "${subject}" reached ${address}`,
  OPERATION: "receive the password changed mail",
} as const;

export const E2E_PIN_CONSUMPTION_ERROR = {
  NO_COUNT: "no count returned",
  OPERATION: "consume the recovery PIN",
  SPENT_COUNT_OPERATION: "count the spent recovery PINs",
} as const;

export const E2E_RECOVERY_SECRET_PARAMS = [
  PASSWORD_RECOVERY_FIELD.PIN,
  PASSWORD_RECOVERY_FIELD.NEW_PASSWORD,
  PASSWORD_RECOVERY_FIELD.CONFIRM_PASSWORD,
] as const;

export const E2E_RECOVERY_ALLOWED_PARAMS: readonly string[] =
  [LOGIN_NOTICE_QUERY_PARAM];

export const E2E_PARALLEL_CONSUMPTIONS = 2;
