import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import {
  verifyPasswordResetPin,
  type PasswordRecoveryPinResult,
} from "@/app/services/password-recovery";
import { failPasswordRecovery } from "@/app/utils/password-recovery/failPasswordRecovery";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";
import { runWithFallback } from "@/app/utils/server-action/runWithFallback";

export const runPasswordRecoveryReset = (
  input: PasswordRecoveryPinInput
): Promise<PasswordRecoveryPinResult> =>
  runWithFallback(
    verifyPasswordResetPin,
    input,
    (): PasswordRecoveryPinResult =>
      failPasswordRecovery(
        PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
      )
  );
