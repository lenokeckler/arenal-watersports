import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import type { PasswordRecoveryRequestInput } from "@/app/utils/password-recovery/models/PasswordRecoveryRequestInput.interface";

export interface PasswordRecoveryRequestErrorSources {
  hasSubmitted: boolean;
  serverError: NullableRef<PasswordRecoveryError>;
  values: PasswordRecoveryRequestInput;
}
