import type { PasswordRule } from "@/app/constants";
import type { PasswordRuleState } from "../constants/PasswordRuleState.constants";

export interface PasswordRuleRow {
  label: string;
  rule: PasswordRule;
  state: PasswordRuleState;
}
