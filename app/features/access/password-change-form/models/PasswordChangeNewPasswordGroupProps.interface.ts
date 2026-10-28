import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { PasswordChangeFormFieldProps } from "./PasswordChangeFormFieldProps.interface";

export interface PasswordChangeNewPasswordGroupProps extends Omit<
  PasswordChangeFormFieldProps,
  "autoComplete" | "describedBy" | "field"
> {
  passwordRules: PasswordRuleResults;
  showFailures: boolean;
}
