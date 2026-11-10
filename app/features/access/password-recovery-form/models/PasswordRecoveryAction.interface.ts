import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import type { PasswordRecoveryFormAction } from "./PasswordRecoveryFormAction.type";

export interface PasswordRecoveryAction {
  action: PasswordRecoveryFormAction;
  dismiss: () => void;
  error: NullableRef<PasswordRecoveryError>;
  isPending: boolean;
}
