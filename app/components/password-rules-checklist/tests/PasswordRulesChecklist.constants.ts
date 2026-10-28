import {
  PASSWORD_RULE,
  type PasswordRule,
} from "@/app/constants";
import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { PasswordRulesChecklistProps } from "../models/PasswordRulesChecklistProps.interface";

export const CHECKLIST_ID = "new-password-rules";

export const TITLE_ID = `${CHECKLIST_ID}-title`;

export const LABELLEDBY_ATTRIBUTE = "aria-labelledby";

export const RULES: PasswordRule[] =
  Object.values(PASSWORD_RULE);

export const TOTAL_RULES = RULES.length;

export const ALL_PENDING_RESULTS: PasswordRuleResults = {
  [PASSWORD_RULE.LENGTH]: false,
  [PASSWORD_RULE.UPPERCASE]: false,
  [PASSWORD_RULE.LOWERCASE]: false,
  [PASSWORD_RULE.DIGIT]: false,
  [PASSWORD_RULE.SYMBOL]: false,
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

export const DEFAULT_CHECKLIST_PROPS: PasswordRulesChecklistProps =
  {
    id: CHECKLIST_ID,
    results: ALL_PENDING_RESULTS,
    showFailures: false,
  };
