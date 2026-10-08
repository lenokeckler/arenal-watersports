import { PASSWORD_RULE } from "@/app/constants";
import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import { PASSWORD_RULES_COPY } from "../constants/PasswordRulesCopy.constants";
import { PASSWORD_RULES_ID_SUFFIX } from "../constants/PasswordRulesIds.constants";
import type { PasswordRulesChecklistViewModel } from "../models/PasswordRulesChecklistViewModel.interface";
import { buildPasswordRuleListItems } from "../utils/buildPasswordRuleListItems";
import { resolvePasswordRuleState } from "../utils/resolvePasswordRuleState";
import { useDebouncedRulesSummary } from "./useDebouncedRulesSummary";

const PASSWORD_RULES = Object.values(PASSWORD_RULE);

export const usePasswordRulesChecklistViewModel = (
  id: string,
  results: PasswordRuleResults,
  showFailures: boolean
): PasswordRulesChecklistViewModel => {
  const metCount = PASSWORD_RULES.filter(
    (rule) => results[rule]
  ).length;
  const summary = useDebouncedRulesSummary(
    metCount,
    PASSWORD_RULES.length
  );
  const rows = PASSWORD_RULES.map((rule) => ({
    label: PASSWORD_RULES_COPY.RULE[rule],
    rule,
    state: resolvePasswordRuleState(
      results[rule],
      showFailures
    ),
  }));

  return {
    items: buildPasswordRuleListItems(rows),
    summary,
    titleId: `${id}${PASSWORD_RULES_ID_SUFFIX.TITLE}`,
  };
};
