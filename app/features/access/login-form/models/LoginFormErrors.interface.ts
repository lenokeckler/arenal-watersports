import type { NullableUndefined } from "@/app/types";
import type { SignInFieldErrors } from "./SignInFieldErrors.type";

export interface LoginFormErrors {
  fieldErrors: SignInFieldErrors;
  isRecoveryOffered: boolean;
  passwordError: NullableUndefined<string>;
  usernameError: NullableUndefined<string>;
}
