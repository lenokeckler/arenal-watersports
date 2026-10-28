import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { PasswordRecoveryFormAction } from "./PasswordRecoveryFormAction.type";
import type { PasswordRecoveryFormErrors } from "./PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryNewPasswordFieldRefs } from "./PasswordRecoveryNewPasswordFieldRefs.type";
import type { PasswordRecoveryNewPasswordFormValues } from "./PasswordRecoveryNewPasswordFormValues.interface";
import type { PasswordRecoverySubmitHandler } from "./PasswordRecoverySubmitHandler.type";

export interface PasswordRecoveryNewPasswordViewModel extends PasswordRecoveryNewPasswordFormValues {
  fieldErrors: PasswordRecoveryFormErrors;
  fieldRefs: PasswordRecoveryNewPasswordFieldRefs;
  formAction: PasswordRecoveryFormAction;
  isPending: boolean;
  onSubmit: PasswordRecoverySubmitHandler;
  passwordRules: PasswordRuleResults;
  showFailures: boolean;
}
