import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { PasswordFieldProps } from "@/app/components/password-field/models/PasswordFieldProps.interface";

export interface NewPasswordGroupProps extends Omit<
  PasswordFieldProps,
  "autoComplete" | "describedBy" | "name"
> {
  passwordRules: PasswordRuleResults;
  showFailures: boolean;
}
