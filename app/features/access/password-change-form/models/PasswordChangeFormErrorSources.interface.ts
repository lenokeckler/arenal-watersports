import type { PasswordChangeErrorCopy } from "./PasswordChangeErrorCopy.type";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import type { PasswordChangeError } from "@/app/utils/password-change/models/PasswordChangeError.interface";

export interface PasswordChangeFormErrorSources {
  errorCopy: PasswordChangeErrorCopy;
  hasSubmitted: boolean;
  serverError: NullableRef<PasswordChangeError>;
  values: PasswordChangeInput;
}
