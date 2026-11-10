export const PASSWORD_RULE_STATE = {
  FAILED: "failed",
  MET: "met",
  PENDING: "pending",
} as const;

export type PasswordRuleState =
  (typeof PASSWORD_RULE_STATE)[keyof typeof PASSWORD_RULE_STATE];
