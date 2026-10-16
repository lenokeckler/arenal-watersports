import {
  PASSWORD_RECOVERY_ERROR_CODE,
  type PasswordRecoveryErrorCode,
} from "@/app/constants";
import { createPasswordRecoveryError } from "@/app/utils/password-recovery/createPasswordRecoveryError";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import { validatePasswordRecoveryReset } from "@/app/utils/password-recovery/validatePasswordRecoveryReset";
import { attemptPasswordRecoveryFinish } from "./attemptPasswordRecoveryFinish";
import { attemptPasswordResetPinConsume } from "./attemptPasswordResetPinConsume";
import { attemptWorkerPasswordSet } from "./attemptWorkerPasswordSet";
import type { DeferredTask } from "./models/DeferredTask.type";
import type { PasswordRecoveryResetResult } from "./models/PasswordRecoveryResetResult.type";
import { schedulePasswordChangedNotice } from "./schedulePasswordChangedNotice";

const failWith = (
  code: PasswordRecoveryErrorCode
): PasswordRecoveryResetResult => ({
  error: createPasswordRecoveryError(code),
  ok: false,
});

export const resetPasswordWithPin = async (
  input: PasswordRecoveryResetInput,
  defer: DeferredTask
): Promise<PasswordRecoveryResetResult> => {
  const validationError =
    validatePasswordRecoveryReset(input);

  if (validationError) {
    return { error: validationError, ok: false };
  }

  const consumed = await attemptPasswordResetPinConsume({
    pin: input.pin,
    username: input.username,
  });

  if (consumed.failed) {
    return failWith(PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN);
  }

  if (!consumed.workerId) {
    return failWith(
      PASSWORD_RECOVERY_ERROR_CODE.PIN_INVALID
    );
  }

  const passwordError = await attemptWorkerPasswordSet(
    consumed.workerId,
    input.newPassword
  );

  if (passwordError) {
    return { error: passwordError, ok: false };
  }

  if (
    !(await attemptPasswordRecoveryFinish(
      consumed.workerId
    ))
  ) {
    return failWith(PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN);
  }

  schedulePasswordChangedNotice(defer, consumed.workerId);

  return { ok: true };
};
