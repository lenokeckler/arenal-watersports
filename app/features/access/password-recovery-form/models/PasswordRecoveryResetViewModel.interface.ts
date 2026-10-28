import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { PasswordRecoveryFormAction } from "./PasswordRecoveryFormAction.type";
import type { PasswordRecoveryFormErrors } from "./PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryResetFieldRefs } from "./PasswordRecoveryResetFieldRefs.type";
import type { PasswordRecoveryResetFormValues } from "./PasswordRecoveryResetFormValues.interface";
import type { PasswordRecoverySubmitHandler } from "./PasswordRecoverySubmitHandler.type";

export interface PasswordRecoveryResetViewModel extends PasswordRecoveryResetFormValues {
  fieldErrors: PasswordRecoveryFormErrors;
  fieldRefs: PasswordRecoveryResetFieldRefs;
  formAction: PasswordRecoveryFormAction;
  isPending: boolean;
  onSubmit: PasswordRecoverySubmitHandler;
  passwordRules: PasswordRuleResults;
  showFailures: boolean;
}
