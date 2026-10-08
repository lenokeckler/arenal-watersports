import {
  PASSWORD_RULE,
  type PasswordRule,
} from "@/app/constants";
import { FIRST_SIGN_IN_ERROR_CODE } from "@/app/constants/access/FirstSignInError.constants";
import { PASSWORD_TOGGLE_COPY } from "@/app/components/field-factory/constants/PasswordToggleCopy.constants";
import { PASSWORD_RULE_STATE } from "@/app/components/password-rules-checklist/constants/PasswordRuleState.constants";
import { PASSWORD_RULES_COPY } from "@/app/components/password-rules-checklist/constants/PasswordRulesCopy.constants";
import { FIRST_SIGN_IN_ERROR_COPY } from "@/app/features/access/first-sign-in-form/constants/FirstSignInErrorCopy.constants";
import { FIRST_SIGN_IN_FORM_COPY } from "@/app/features/access/first-sign-in-form/constants/FirstSignInFormCopy.constants";
import { FIRST_SIGN_IN_RULES_ID } from "@/app/features/access/first-sign-in-form/constants/FirstSignInRules.constants";

export const E2E_FIRST_SIGN_IN_COPY = {
  CONFIRM_PASSWORD_LABEL:
    FIRST_SIGN_IN_FORM_COPY.CONFIRM_PASSWORD_LABEL,
  CONFIRMATION_MISMATCH:
    FIRST_SIGN_IN_ERROR_COPY[
      FIRST_SIGN_IN_ERROR_CODE.CONFIRMATION_MISMATCH
    ],
  CURRENT_PASSWORD_INVALID:
    FIRST_SIGN_IN_ERROR_COPY[
      FIRST_SIGN_IN_ERROR_CODE.CURRENT_PASSWORD_INVALID
    ],
  CURRENT_PASSWORD_LABEL:
    FIRST_SIGN_IN_FORM_COPY.CURRENT_PASSWORD_LABEL,
  HEADING: FIRST_SIGN_IN_FORM_COPY.HEADING,
  NEW_PASSWORD_LABEL:
    FIRST_SIGN_IN_FORM_COPY.NEW_PASSWORD_LABEL,
  NEW_PASSWORD_RULES:
    FIRST_SIGN_IN_ERROR_COPY[
      FIRST_SIGN_IN_ERROR_CODE.NEW_PASSWORD_RULES
    ],
  RULES_TITLE: PASSWORD_RULES_COPY.TITLE,
  SHOW_PASSWORD: PASSWORD_TOGGLE_COPY.SHOW,
  SUBMIT: FIRST_SIGN_IN_FORM_COPY.SUBMIT,
} as const;

export const E2E_FIRST_SIGN_IN_RULES_LIST_ID =
  FIRST_SIGN_IN_RULES_ID;

export const E2E_PASSWORD_RULES: readonly PasswordRule[] = [
  PASSWORD_RULE.LENGTH,
  PASSWORD_RULE.UPPERCASE,
  PASSWORD_RULE.LOWERCASE,
  PASSWORD_RULE.DIGIT,
  PASSWORD_RULE.SYMBOL,
];

export const E2E_PASSWORD_RULES_COPY = PASSWORD_RULES_COPY;

export const E2E_PASSWORD_RULE_STATE = PASSWORD_RULE_STATE;

export const E2E_FIRST_SIGN_IN_PASSWORDS = {
  LOWERCASE_ONLY: "abcdefgh",
  NEW: "Nueva.Clave.2026!",
  OTHER: "Otra.Clave.2026!",
  TEMPORARY: "Temporal.2026!",
  WEAK: "abc",
  WRONG_TEMPORARY: "Equivocada.2026!",
} as const;

export const E2E_PENDING_WORKER = {
  BASE_ROLE: "operaciones",
  FULL_NAME: "Cuenta de prueba E2E",
  USERNAME_PREFIX: "e2e_",
  USERNAME_SUFFIX_LENGTH: 12,
} as const;

export const E2E_FIRST_SIGN_IN_SCREENSHOT_BASENAME = {
  INITIAL: "01-first-sign-in-initial",
  MISMATCH: "05-first-sign-in-mismatch",
  RULES_PARTLY_MET: "02-first-sign-in-rules-partly-met",
  WEAK_PASSWORD: "04-first-sign-in-weak-password",
  WRONG_TEMPORARY: "03-first-sign-in-wrong-temporary",
} as const;
