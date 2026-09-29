import type { SignInCredentials } from "@/app/services/authentication/models/SignInCredentials.interface";
import type { LoginFormFieldChangeHandler } from "./LoginFormFieldChangeHandler.type";
import type { LoginFormSubmitHandler } from "./LoginFormSubmitHandler.type";
import type { SignInFieldErrors } from "./SignInFieldErrors.type";

export interface LoginFormViewModel {
  fieldErrors: SignInFieldErrors;
  handlePasswordChange: LoginFormFieldChangeHandler;
  handleSubmit: LoginFormSubmitHandler;
  handleUsernameChange: LoginFormFieldChangeHandler;
  isPending: boolean;
  values: SignInCredentials;
}
