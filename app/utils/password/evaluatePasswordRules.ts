import {
  PASSWORD_LENGTH,
  PASSWORD_RULE,
} from "@/app/constants";
import { hasDigit } from "./hasDigit";
import { hasLowercase } from "./hasLowercase";
import { hasSymbol } from "./hasSymbol";
import { hasUppercase } from "./hasUppercase";
import type { PasswordRuleResults } from "./models/PasswordRuleResults.type";

export const evaluatePasswordRules = (
  password: string
): PasswordRuleResults => ({
  [PASSWORD_RULE.LENGTH]:
    password.length >= PASSWORD_LENGTH.MIN &&
    password.length <= PASSWORD_LENGTH.MAX,
  [PASSWORD_RULE.UPPERCASE]: hasUppercase(password),
  [PASSWORD_RULE.LOWERCASE]: hasLowercase(password),
  [PASSWORD_RULE.DIGIT]: hasDigit(password),
  [PASSWORD_RULE.SYMBOL]: hasSymbol(password),
});
