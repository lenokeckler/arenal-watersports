import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { PasswordChangeFieldRefs } from "./PasswordChangeFieldRefs.type";
import type { PasswordChangeFormAction } from "./PasswordChangeFormAction.type";
import type { PasswordChangeFormErrors } from "./PasswordChangeFormErrors.type";
import type { PasswordChangeFormValues } from "./PasswordChangeFormValues.interface";
import type { PasswordChangeSubmitHandler } from "./PasswordChangeSubmitHandler.type";

export interface PasswordChangeFormViewModel extends PasswordChangeFormValues {
  fieldErrors: PasswordChangeFormErrors;
  fieldRefs: PasswordChangeFieldRefs;
  formAction: PasswordChangeFormAction;
  isPending: boolean;
  onSubmit: PasswordChangeSubmitHandler;
  passwordRules: PasswordRuleResults;
  showFailures: boolean;
}
