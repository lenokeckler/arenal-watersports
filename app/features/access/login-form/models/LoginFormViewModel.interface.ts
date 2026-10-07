import type { NullableUndefined } from "@/app/types";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { LoginFormFieldChangeHandler } from "./LoginFormFieldChangeHandler.type";
import type { LoginFormSubmitHandler } from "./LoginFormSubmitHandler.type";
import type { SignInFieldErrors } from "./SignInFieldErrors.type";
import type { SignInFormAction } from "./SignInFormAction.type";

export interface LoginFormViewModel {
  fieldErrors: SignInFieldErrors;
  formAction: SignInFormAction;
  handlePasswordChange: LoginFormFieldChangeHandler;
  handleSubmit: LoginFormSubmitHandler;
  handleUsernameChange: LoginFormFieldChangeHandler;
  isPending: boolean;
  passwordError: NullableUndefined<string>;
  usernameError: NullableUndefined<string>;
  values: SignInCredentials;
}
