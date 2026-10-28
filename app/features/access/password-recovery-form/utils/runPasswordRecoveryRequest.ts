import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import {
  requestPasswordRecovery,
  type DeferredTask,
  type PasswordRecoveryRequestResult,
} from "@/app/services/password-recovery";
import { readClientNetworkKey } from "@/app/services/request";
import { failPasswordRecovery } from "@/app/utils/password-recovery/failPasswordRecovery";
import type { PasswordRecoveryRequestInput } from "@/app/utils/password-recovery/models/PasswordRecoveryRequestInput.interface";
import { runWithFallback } from "@/app/utils/server-action/runWithFallback";

export const runPasswordRecoveryRequest = (
  input: PasswordRecoveryRequestInput,
  defer: DeferredTask
): Promise<PasswordRecoveryRequestResult> =>
  runWithFallback(
    async (guardedInput) =>
      requestPasswordRecovery(
        {
          ...guardedInput,
          networkKey: await readClientNetworkKey(),
        },
        defer
      ),
    input,
    (): PasswordRecoveryRequestResult =>
      failPasswordRecovery(
        PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
      )
  );
