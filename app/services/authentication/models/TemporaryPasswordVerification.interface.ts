import type { NullableRef } from "@/app/types";
import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";

export interface TemporaryPasswordVerification {
  error: NullableRef<FirstSignInError>;
  passwordAlreadyUpdated: boolean;
}
