import type { NullableRef } from "@/app/types";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import type { FirstSignInError } from "@/app/utils/first-sign-in/models/FirstSignInError.interface";

export interface FirstSignInFormErrorSources {
  hasSubmitted: boolean;
  serverError: NullableRef<FirstSignInError>;
  values: FirstPasswordChangeInput;
}
