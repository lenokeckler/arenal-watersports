import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import type { NullableRef } from "@/app/types";

export interface LoginFormErrorSources {
  fallbackError: NullableRef<SignInError>;
  hasSubmitted: boolean;
  notice: NullableRef<SignInError>;
  serverError: NullableRef<SignInError>;
  values: SignInCredentials;
}
