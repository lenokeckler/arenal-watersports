import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { LoginFormFieldChangeHandler } from "./LoginFormFieldChangeHandler.type";

export interface LoginFormValues {
  handlePasswordChange: LoginFormFieldChangeHandler;
  handleUsernameChange: LoginFormFieldChangeHandler;
  values: SignInCredentials;
}
