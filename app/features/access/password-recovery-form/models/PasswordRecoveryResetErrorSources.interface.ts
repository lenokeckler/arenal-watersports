import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";

export interface PasswordRecoveryResetErrorSources {
  hasSubmitted: boolean;
  serverError: NullableRef<PasswordRecoveryError>;
  values: PasswordRecoveryPinInput;
}
