import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";

export interface PasswordRulesChecklistProps {
  id: string;
  results: PasswordRuleResults;
  showFailures: boolean;
}
