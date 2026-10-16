import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { setWorkerPassword } from "@/app/services/authentication";
import type { NullableRef } from "@/app/types";
import { createPasswordRecoveryError } from "@/app/utils/password-recovery/createPasswordRecoveryError";
import { mapPasswordChangeErrorToRecovery } from "@/app/utils/password-recovery/mapPasswordChangeErrorToRecovery";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";

export const attemptWorkerPasswordSet = async (
  workerId: string,
  newPassword: string
): Promise<NullableRef<PasswordRecoveryError>> => {
  try {
    const error = await setWorkerPassword(
      workerId,
      newPassword
    );

    return error
      ? mapPasswordChangeErrorToRecovery(error)
      : null;
  } catch {
    return createPasswordRecoveryError(
      PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
    );
  }
};
