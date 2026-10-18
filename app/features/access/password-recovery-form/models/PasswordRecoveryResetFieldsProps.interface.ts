import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { PasswordRecoveryFormErrors } from "./PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryResetFieldRefs } from "./PasswordRecoveryResetFieldRefs.type";
import type { PasswordRecoveryResetFormValues } from "./PasswordRecoveryResetFormValues.interface";

export interface PasswordRecoveryResetFieldsProps extends PasswordRecoveryResetFormValues {
  fieldErrors: PasswordRecoveryFormErrors;
  fieldRefs: PasswordRecoveryResetFieldRefs;
  isPending: boolean;
  passwordRules: PasswordRuleResults;
  showFailures: boolean;
}
