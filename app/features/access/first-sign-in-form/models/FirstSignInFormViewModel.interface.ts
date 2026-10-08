import type { PasswordRuleResults } from "@/app/utils/password/models/PasswordRuleResults.type";
import type { FirstSignInFieldRefs } from "./FirstSignInFieldRefs.type";
import type { FirstSignInFormAction } from "./FirstSignInFormAction.type";
import type { FirstSignInFormErrors } from "./FirstSignInFormErrors.type";
import type { FirstSignInFormValues } from "./FirstSignInFormValues.interface";
import type { FirstSignInSubmitHandler } from "./FirstSignInSubmitHandler.type";

export interface FirstSignInFormViewModel extends FirstSignInFormValues {
  fieldErrors: FirstSignInFormErrors;
  fieldRefs: FirstSignInFieldRefs;
  formAction: FirstSignInFormAction;
  isPending: boolean;
  onSubmit: FirstSignInSubmitHandler;
  passwordRules: PasswordRuleResults;
  showFailures: boolean;
}
