import { PASSWORD_RULES_COPY } from "@/app/components/password-rules-checklist/constants/PasswordRulesCopy.constants";
import { PASSWORD_RULE_STATE } from "@/app/components/password-rules-checklist/constants/PasswordRuleState.constants";
import { PASSWORD_RULE } from "@/app/constants";

export const LABEL_SEPARATOR = "|";
export const FORM_SELECTOR = "form";
export const ARIA_DISABLED_ATTRIBUTE = "aria-disabled";
export const NO_VALIDATE_PROPERTY = "noValidate";
export const TRUE_VALUE = "true";
export const NO_ALERTS = 0;
export const SINGLE_ALERT = 1;
export const SINGLE_SPINNER = 1;
export const PROGRESS_ICON_NAME = "progress_activity";
export const RULE_COUNT = Object.keys(PASSWORD_RULE).length;
export const VALID_NEW_PASSWORD = "Nueva#Clave1";
export const PRESET_USERNAME = "ana.perez";
export const ENTRY_TEST_ID = "password-recovery-entry";
export const PREFILL_ATTRIBUTE = "data-username";
export const SCRIPT_SELECTOR = "script";
export const PENDING_RULE_LABEL =
  PASSWORD_RULES_COPY.STATE[PASSWORD_RULE_STATE.PENDING];
