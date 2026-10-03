import type { SignInCredentials } from "@/app/utils/sign-in/models/SignInCredentials.interface";
import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import type { NullableRef } from "@/app/types";

export interface SignInSubmission {
  clearServerError: () => void;
  hasSubmitted: boolean;
  isPending: boolean;
  serverError: NullableRef<SignInError>;
  submit: (credentials: SignInCredentials) => void;
}
