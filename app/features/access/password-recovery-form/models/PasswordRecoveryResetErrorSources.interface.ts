import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";

export interface PasswordRecoveryResetErrorSources {
  hasSubmitted: boolean;
  serverError: NullableRef<PasswordRecoveryError>;
  values: PasswordRecoveryResetInput;
}
