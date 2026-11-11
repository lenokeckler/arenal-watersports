import type { PasswordRuleState } from "../constants/PasswordRuleState.constants";

export interface PasswordRulesChecklistItemProps {
  label: string;
  state: PasswordRuleState;
}
