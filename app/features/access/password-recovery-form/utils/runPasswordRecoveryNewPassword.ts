import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import {
  resetPasswordWithGrant,
  type DeferredTask,
  type PasswordRecoveryResetResult,
} from "@/app/services/password-recovery";
import type { PasswordRecoveryGrantResetInput } from "@/app/services/password-recovery/models/PasswordRecoveryGrantResetInput.interface";
import { failPasswordRecovery } from "@/app/utils/password-recovery/failPasswordRecovery";
import { runWithFallback } from "@/app/utils/server-action/runWithFallback";

export const runPasswordRecoveryNewPassword = (
  input: PasswordRecoveryGrantResetInput,
  defer: DeferredTask
): Promise<PasswordRecoveryResetResult> =>
  runWithFallback(
    (guardedInput) =>
      resetPasswordWithGrant(guardedInput, defer),
    input,
    (): PasswordRecoveryResetResult =>
      failPasswordRecovery(
        PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
      )
  );
