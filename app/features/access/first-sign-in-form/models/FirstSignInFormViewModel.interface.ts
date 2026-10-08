import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { FirstSignInChangeHandler } from "./FirstSignInChangeHandler.type";
import type { FirstSignInFieldRefs } from "./FirstSignInFieldRefs.type";
import type { FirstSignInFormAction } from "./FirstSignInFormAction.type";
import type { FirstSignInFormErrors } from "./FirstSignInFormErrors.type";
import type { FirstSignInSubmitHandler } from "./FirstSignInSubmitHandler.type";

export interface FirstSignInFormViewModel {
  fieldErrors: FirstSignInFormErrors;
  fieldRefs: FirstSignInFieldRefs;
  formAction: FirstSignInFormAction;
  isPending: boolean;
  onChange: FirstSignInChangeHandler;
  onSubmit: FirstSignInSubmitHandler;
  passwordRules: PasswordRuleResults;
  showFailures: boolean;
  values: FirstPasswordChangeInput;
}
