import {
  PASSWORD_RULE,
  type PasswordRule,
} from "@/app/constants";
import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { PasswordRulesChecklistProps } from "../models/PasswordRulesChecklistProps.interface";

export const CHECKLIST_ID = "new-password-rules";

export const TITLE_ID = `${CHECKLIST_ID}-title`;

export const LABELLEDBY_ATTRIBUTE = "aria-labelledby";

export const STATUS_LIVE_ATTRIBUTE = "aria-live";

export const STATUS_LIVE_POLITE = "polite";

export const STATUS_ATOMIC_ATTRIBUTE = "aria-atomic";

export const STATUS_ATOMIC_TRUE = "true";

export const ONE_MS = 1;

export const RULES: PasswordRule[] =
  Object.values(PASSWORD_RULE);

export const TOTAL_RULES = RULES.length;

export const ZERO_MET_RULES = 0;

export const ONE_MET_RULE = 1;

export const TWO_MET_RULES = 2;

export const THREE_MET_RULES = 3;

export const NO_TIMERS = 0;

export const NO_CHANGES = 0;

export const SINGLE_CHANGE = 1;

export const RAPID_TYPING_INTERVAL_MS = 100;

export const ALL_PENDING_RESULTS: PasswordRuleResults = {
  [PASSWORD_RULE.LENGTH]: false,
  [PASSWORD_RULE.UPPERCASE]: false,
  [PASSWORD_RULE.LOWERCASE]: false,
  [PASSWORD_RULE.DIGIT]: false,
  [PASSWORD_RULE.SYMBOL]: false,
};

export const ALL_MET_RESULTS: PasswordRuleResults = {
  [PASSWORD_RULE.LENGTH]: true,
  [PASSWORD_RULE.UPPERCASE]: true,
  [PASSWORD_RULE.LOWERCASE]: true,
  [PASSWORD_RULE.DIGIT]: true,
  [PASSWORD_RULE.SYMBOL]: true,
};

export const LOWERCASE_ONLY_RESULTS: PasswordRuleResults = {
  ...ALL_PENDING_RESULTS,
  [PASSWORD_RULE.LOWERCASE]: true,
};

export const LOWERCASE_AND_DIGIT_RESULTS: PasswordRuleResults =
  {
    ...LOWERCASE_ONLY_RESULTS,
    [PASSWORD_RULE.DIGIT]: true,
  };

export const DIGIT_ONLY_RESULTS: PasswordRuleResults = {
  ...ALL_PENDING_RESULTS,
  [PASSWORD_RULE.DIGIT]: true,
};

export const THREE_MET_RESULTS: PasswordRuleResults = {
  ...LOWERCASE_AND_DIGIT_RESULTS,
  [PASSWORD_RULE.UPPERCASE]: true,
};

export const DEFAULT_CHECKLIST_PROPS: PasswordRulesChecklistProps =
  {
    id: CHECKLIST_ID,
    results: ALL_PENDING_RESULTS,
    showFailures: false,
  };
