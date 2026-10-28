import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { failPasswordRecovery } from "@/app/utils/password-recovery/failPasswordRecovery";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import { attemptPasswordRecoveryFinish } from "./attemptPasswordRecoveryFinish";
import { attemptPasswordResetPinConsume } from "./attemptPasswordResetPinConsume";
import { attemptWorkerPasswordSet } from "./attemptWorkerPasswordSet";
import type { DeferredTask } from "./models/DeferredTask.type";
import type { PasswordRecoveryResetResult } from "./models/PasswordRecoveryResetResult.type";
import { schedulePasswordChangedNoticeQuietly } from "./schedulePasswordChangedNoticeQuietly";
import { validatePasswordRecoveryResetOnServer } from "./validatePasswordRecoveryResetOnServer";

export const resetPasswordWithPin = async (
  input: PasswordRecoveryResetInput,
  defer: DeferredTask
): Promise<PasswordRecoveryResetResult> => {
  const validationError =
    validatePasswordRecoveryResetOnServer(input);

  if (validationError) {
    return { error: validationError, ok: false };
  }

  const consumed = await attemptPasswordResetPinConsume({
    pin: input.pin,
    username: input.username,
  });

  if (consumed.failed) {
    return failPasswordRecovery(
      PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
    );
  }

  if (!consumed.workerId) {
    return failPasswordRecovery(
      PASSWORD_RECOVERY_ERROR_CODE.PIN_INVALID
    );
  }

  const passwordSet = await attemptWorkerPasswordSet(
    consumed.workerId,
    input.newPassword
  );

  if (passwordSet.failed) {
    return failPasswordRecovery(
      PASSWORD_RECOVERY_ERROR_CODE.PASSWORD_NOT_SAVED
    );
  }

  const finished = await attemptPasswordRecoveryFinish(
    consumed.workerId
  );

  if (finished.failed) {
    return failPasswordRecovery(
      PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
    );
  }

  await schedulePasswordChangedNoticeQuietly(
    defer,
    consumed.workerId
  );

  return { ok: true };
};
