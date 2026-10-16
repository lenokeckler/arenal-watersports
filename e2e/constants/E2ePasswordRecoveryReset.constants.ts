import {
  PASSWORD_CHANGED_MAIL_COPY,
  PASSWORD_RESET_PIN,
} from "@/app/constants";

export const E2E_RECOVERY_RESET_PASSWORDS = {
  FIRST: "Primera.Prueba.2026!",
  SECOND: "Segunda.Prueba.2026!",
} as const;

export const E2E_RECOVERY_RESET_FAILED_ATTEMPTS = 4;

export const E2E_PASSWORD_CHANGED_MAIL = {
  LINK_PATTERN: /https?:\/\/|www\./i,
  PIN_PATTERN: new RegExp(
    `[0-9]{${PASSWORD_RESET_PIN.LENGTH}}`
  ),
  SUBJECT: PASSWORD_CHANGED_MAIL_COPY.SUBJECT,
} as const;

export const E2E_RECOVERY_OUTCOME = {
  RECOVERED: "recovered",
  REFUSED: "refused",
} as const;

export const E2E_RECOVERY_OUTCOME_COUNT = {
  EXACTLY_ONE: 1,
} as const;
