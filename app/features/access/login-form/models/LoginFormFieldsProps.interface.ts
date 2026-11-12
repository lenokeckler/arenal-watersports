import type { NullableUndefined } from "@/app/types";
import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { LoginFormFieldChangeHandler } from "./LoginFormFieldChangeHandler.type";
import type { LoginFormFieldRefs } from "./LoginFormFieldRefs.type";

export interface LoginFormFieldsProps {
  fieldRefs: LoginFormFieldRefs;
  onPasswordChange: LoginFormFieldChangeHandler;
  onUsernameChange: LoginFormFieldChangeHandler;
  passwordError: NullableUndefined<string>;
  usernameError: NullableUndefined<string>;
  values: SignInCredentials;
}
