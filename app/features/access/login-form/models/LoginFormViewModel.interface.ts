import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { LoginFormErrors } from "./LoginFormErrors.interface";
import type { LoginFormFieldChangeHandler } from "./LoginFormFieldChangeHandler.type";
import type { LoginFormFieldRefs } from "./LoginFormFieldRefs.type";
import type { LoginFormSubmitHandler } from "./LoginFormSubmitHandler.type";
import type { SignInFormAction } from "./SignInFormAction.type";

export interface LoginFormViewModel extends LoginFormErrors {
  fieldRefs: LoginFormFieldRefs;
  formAction: SignInFormAction;
  handlePasswordChange: LoginFormFieldChangeHandler;
  handleSubmit: LoginFormSubmitHandler;
  handleUsernameChange: LoginFormFieldChangeHandler;
  isPending: boolean;
  values: SignInCredentials;
}
