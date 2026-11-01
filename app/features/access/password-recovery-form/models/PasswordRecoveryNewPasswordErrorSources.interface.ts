import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import type { PasswordRecoveryNewPasswordInput } from "@/app/utils/password-recovery/models/PasswordRecoveryNewPasswordInput.interface";

export interface PasswordRecoveryNewPasswordErrorSources {
  hasSubmitted: boolean;
  serverError: NullableRef<PasswordRecoveryError>;
  values: PasswordRecoveryNewPasswordInput;
}
