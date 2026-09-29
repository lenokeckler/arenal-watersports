import type { PasswordRuleId } from "@/app/constants";

export type PasswordRuleEvaluators = Record<
  PasswordRuleId,
  (password: string) => boolean
>;
