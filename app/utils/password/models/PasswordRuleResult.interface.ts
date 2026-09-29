import type { PasswordRuleId } from "@/app/constants";

export interface PasswordRuleResult {
  id: PasswordRuleId;
  isMet: boolean;
}
