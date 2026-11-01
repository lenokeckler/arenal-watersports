import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { failPasswordRecovery } from "@/app/utils/password-recovery/failPasswordRecovery";
import { attemptPasswordRecoveryFinish } from "./attemptPasswordRecoveryFinish";
import { attemptPasswordResetGrantRedeem } from "./attemptPasswordResetGrantRedeem";
import { attemptWorkerPasswordSet } from "./attemptWorkerPasswordSet";
import type { DeferredTask } from "./models/DeferredTask.type";
import type { PasswordRecoveryGrantResetInput } from "./models/PasswordRecoveryGrantResetInput.interface";
import type { PasswordRecoveryResetResult } from "./models/PasswordRecoveryResetResult.type";
import { schedulePasswordChangedNoticeQuietly } from "./schedulePasswordChangedNoticeQuietly";
import { validatePasswordRecoveryNewPasswordOnServer } from "./validatePasswordRecoveryNewPasswordOnServer";

export const resetPasswordWithGrant = async (
  { grant, ...passwords }: PasswordRecoveryGrantResetInput,
  defer: DeferredTask
): Promise<PasswordRecoveryResetResult> => {
  const validationError =
    validatePasswordRecoveryNewPasswordOnServer(passwords);

  if (validationError) {
    return { error: validationError, ok: false };
  }

  const redeemed =
    await attemptPasswordResetGrantRedeem(grant);

  if (redeemed.failed) {
    return failPasswordRecovery(
      PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
    );
  }

  if (!redeemed.workerId) {
    return failPasswordRecovery(
      PASSWORD_RECOVERY_ERROR_CODE.RESET_EXPIRED
    );
  }

  const passwordSet = await attemptWorkerPasswordSet(
    redeemed.workerId,
    passwords.newPassword
  );

  if (passwordSet.failed) {
    return failPasswordRecovery(
      PASSWORD_RECOVERY_ERROR_CODE.PASSWORD_NOT_SAVED
    );
  }

  const finished = await attemptPasswordRecoveryFinish(
    redeemed.workerId
  );

  if (finished.failed) {
    return failPasswordRecovery(
      PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
    );
  }

  await schedulePasswordChangedNoticeQuietly(
    defer,
    redeemed.workerId
  );

  return { ok: true };
};
