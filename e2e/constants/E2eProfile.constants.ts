import { PASSWORD_TOGGLE_COPY } from "@/app/components/field-factory/constants/PasswordToggleCopy.constants";
import { PASSWORD_RULES_COPY } from "@/app/components/password-rules-checklist/constants/PasswordRulesCopy.constants";
import {
  PASSWORD_CHANGE_ERROR_CODE,
  PATHS,
  PROFILE_NOTICE,
  PROFILE_NOTICE_QUERY_PARAM,
  SIGN_IN_NOTICE_QUERY_PARAM,
  SIGN_IN_NOTICE_REASON,
} from "@/app/constants";
import { PROFILE_PASSWORD_ERROR_COPY } from "@/app/features/access/password-change-form/constants/ProfilePasswordErrorCopy.constants";
import { PROFILE_PASSWORD_FORM_COPY } from "@/app/features/access/password-change-form/constants/ProfilePasswordFormCopy.constants";
import { PROFILE_COPY } from "@/app/features/access/profile-hub/constants/ProfileCopy.constants";
import { appendQueryParam } from "@/app/utils/pathname/appendQueryParam";
import type { WorkerAccountState } from "../support/models/WorkerAccountState.interface";

export const E2E_PROFILE_COPY = {
  CONFIRM_PASSWORD_LABEL:
    PROFILE_PASSWORD_FORM_COPY.CONFIRM_PASSWORD_LABEL,
  CONFIRMATION_MISMATCH:
    PROFILE_PASSWORD_ERROR_COPY[
      PASSWORD_CHANGE_ERROR_CODE.CONFIRMATION_MISMATCH
    ],
  CURRENT_PASSWORD_INVALID:
    PROFILE_PASSWORD_ERROR_COPY[
      PASSWORD_CHANGE_ERROR_CODE.CURRENT_PASSWORD_INVALID
    ],
  CURRENT_PASSWORD_LABEL:
    PROFILE_PASSWORD_FORM_COPY.CURRENT_PASSWORD_LABEL,
  NEW_PASSWORD_LABEL:
    PROFILE_PASSWORD_FORM_COPY.NEW_PASSWORD_LABEL,
  NEW_PASSWORD_RULES:
    PROFILE_PASSWORD_ERROR_COPY[
      PASSWORD_CHANGE_ERROR_CODE.NEW_PASSWORD_RULES
    ],
  PASSWORD_CHANGED_NOTICE:
    PROFILE_COPY.PASSWORD_CHANGED_NOTICE,
  PASSWORD_ENTRY: PROFILE_COPY.PASSWORD_ENTRY,
  PASSWORD_HEADING: PROFILE_PASSWORD_FORM_COPY.HEADING,
  PROFILE_HEADING: PROFILE_COPY.TITLE,
  RULES_TITLE: PASSWORD_RULES_COPY.TITLE,
  SHOW_PASSWORD: PASSWORD_TOGGLE_COPY.SHOW,
  SUBMIT: PROFILE_PASSWORD_FORM_COPY.SUBMIT,
} as const;

export const E2E_PROFILE_INVALID_PASSWORDS = {
  CURRENT: "Actual.Prueba.2026!",
  OTHER: "Otra.Prueba.2026!",
  WEAK: "abc",
} as const;

export const E2E_PROFILE_NEW_PASSWORD =
  "Nueva.Prueba.2026!";

export const E2E_PROFILE_NOTICE_PATH = appendQueryParam(
  PATHS.PROFILE.ROOT,
  PROFILE_NOTICE_QUERY_PARAM,
  PROFILE_NOTICE.PASSWORD_CHANGED
);

export const E2E_BLOCKED_BY_ATTEMPTS_LOGIN_PATH =
  appendQueryParam(
    PATHS.ACCESS.LOGIN,
    SIGN_IN_NOTICE_QUERY_PARAM,
    SIGN_IN_NOTICE_REASON.BLOCKED_BY_ATTEMPTS
  );

export const E2E_BLOCKED_ACCOUNT_STATUS: WorkerAccountState["status"] =
  "blocked";

export const E2E_PROFILE_SCREENSHOT_BASENAME = {
  HUB: "01-profile-hub",
  HUB_WITH_NOTICE: "02-profile-hub-password-changed",
  PASSWORD_FORM: "03-profile-password-form",
  PASSWORD_FORM_ERRORS: "04-profile-password-form-errors",
} as const;
