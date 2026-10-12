import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import type { NullableRef } from "@/app/types";
import type { SignInFormAction } from "./SignInFormAction.type";

export interface SignInFallback {
  action: SignInFormAction;
  dismiss: () => void;
  error: NullableRef<SignInError>;
}
