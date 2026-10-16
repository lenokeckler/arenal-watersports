import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import {
  requestPasswordRecovery,
  type DeferredTask,
  type PasswordRecoveryRequestResult,
} from "@/app/services/password-recovery";
import { readClientNetworkKey } from "@/app/services/request";
import { failPasswordRecovery } from "@/app/utils/password-recovery/failPasswordRecovery";
import type { PasswordRecoveryRequestInput } from "@/app/utils/password-recovery/models/PasswordRecoveryRequestInput.interface";

export const runPasswordRecoveryRequest = async (
  input: PasswordRecoveryRequestInput,
  defer: DeferredTask
): Promise<PasswordRecoveryRequestResult> => {
  try {
    const networkKey = await readClientNetworkKey();

    return await requestPasswordRecovery(
      { ...input, networkKey },
      defer
    );
  } catch {
    return failPasswordRecovery(
      PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
    );
  }
};
