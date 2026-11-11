import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";

export interface PasswordRecoveryResetValuesProps {
  serverError: NullableRef<PasswordRecoveryError>;
}
