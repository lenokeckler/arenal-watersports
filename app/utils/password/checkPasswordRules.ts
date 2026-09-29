import {
  PASSWORD_LENGTH,
  PASSWORD_RULE_ID,
  PASSWORD_RULE_ORDER,
  PASSWORD_RULE_PATTERN,
} from "@/app/constants";
import { getPasswordByteLength } from "./getPasswordByteLength";
import type { PasswordRuleEvaluators } from "./models/PasswordRuleEvaluators.type";
import type { PasswordRuleResult } from "./models/PasswordRuleResult.interface";

const ruleEvaluators: PasswordRuleEvaluators = {
  [PASSWORD_RULE_ID.DIGIT]: (password) =>
    PASSWORD_RULE_PATTERN.DIGIT.test(password),
  [PASSWORD_RULE_ID.LOWERCASE]: (password) =>
    PASSWORD_RULE_PATTERN.LOWERCASE.test(password),
  [PASSWORD_RULE_ID.MAX_LENGTH]: (password) =>
    getPasswordByteLength(password) <= PASSWORD_LENGTH.MAX,
  [PASSWORD_RULE_ID.MIN_LENGTH]: (password) =>
    password.length >= PASSWORD_LENGTH.MIN,
  [PASSWORD_RULE_ID.SYMBOL]: (password) =>
    PASSWORD_RULE_PATTERN.SYMBOL.test(password),
  [PASSWORD_RULE_ID.UPPERCASE]: (password) =>
    PASSWORD_RULE_PATTERN.UPPERCASE.test(password),
};

export const checkPasswordRules = (
  password: string
): PasswordRuleResult[] =>
  PASSWORD_RULE_ORDER.map((id) => ({
    id,
    isMet: ruleEvaluators[id](password),
  }));
