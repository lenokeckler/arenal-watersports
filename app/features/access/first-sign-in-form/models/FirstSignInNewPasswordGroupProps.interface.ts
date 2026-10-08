import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { FirstSignInPasswordFieldProps } from "./FirstSignInPasswordFieldProps.interface";

export interface FirstSignInNewPasswordGroupProps extends Omit<
  FirstSignInPasswordFieldProps,
  "autoComplete" | "describedBy" | "field" | "label"
> {
  passwordRules: PasswordRuleResults;
  showFailures: boolean;
}
