import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import {
  resetPasswordWithPin,
  type DeferredTask,
  type PasswordRecoveryResetResult,
} from "@/app/services/password-recovery";
import { failPasswordRecovery } from "@/app/utils/password-recovery/failPasswordRecovery";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import { runWithFallback } from "@/app/utils/server-action/runWithFallback";

export const runPasswordRecoveryReset = (
  input: PasswordRecoveryResetInput,
  defer: DeferredTask
): Promise<PasswordRecoveryResetResult> =>
  runWithFallback(
    (guardedInput) =>
      resetPasswordWithPin(guardedInput, defer),
    input,
    (): PasswordRecoveryResetResult =>
      failPasswordRecovery(
        PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
      )
  );
