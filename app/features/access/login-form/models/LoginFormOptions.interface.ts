import type { SignInError } from "@/app/utils/sign-in/models/SignInError.interface";
import type { NullableRef } from "@/app/types";

export interface LoginFormOptions {
  notice: NullableRef<SignInError>;
}
