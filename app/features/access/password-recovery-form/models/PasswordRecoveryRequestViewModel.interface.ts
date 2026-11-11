import type { PasswordRecoveryFormAction } from "./PasswordRecoveryFormAction.type";
import type { PasswordRecoveryFormErrors } from "./PasswordRecoveryFormErrors.type";
import type { PasswordRecoveryRequestFieldRefs } from "./PasswordRecoveryRequestFieldRefs.type";
import type { PasswordRecoveryRequestFormValues } from "./PasswordRecoveryRequestFormValues.interface";
import type { PasswordRecoverySubmitHandler } from "./PasswordRecoverySubmitHandler.type";

export interface PasswordRecoveryRequestViewModel extends PasswordRecoveryRequestFormValues {
  fieldErrors: PasswordRecoveryFormErrors;
  fieldRefs: PasswordRecoveryRequestFieldRefs;
  formAction: PasswordRecoveryFormAction;
  isPending: boolean;
  onSubmit: PasswordRecoverySubmitHandler;
}
