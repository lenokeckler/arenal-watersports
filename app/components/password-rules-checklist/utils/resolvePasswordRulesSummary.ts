import { PASSWORD_RULES_COPY } from "../constants/PasswordRulesCopy.constants";

export const resolvePasswordRulesSummary = (
  metCount: number,
  total: number
): string =>
  metCount === total
    ? PASSWORD_RULES_COPY.SUMMARY_ALL(total)
    : PASSWORD_RULES_COPY.SUMMARY_PARTIAL(metCount, total);
