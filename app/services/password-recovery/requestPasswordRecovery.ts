import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { createPasswordRecoveryError } from "@/app/utils/password-recovery/createPasswordRecoveryError";
import { validatePasswordRecoveryRequest } from "@/app/utils/password-recovery/validatePasswordRecoveryRequest";
import { attemptPasswordResetPinIssue } from "./attemptPasswordResetPinIssue";
import { generatePasswordResetPin } from "./generatePasswordResetPin";
import type { DeferredTask } from "./models/DeferredTask.type";
import type { NetworkPasswordRecoveryRequestInput } from "./models/NetworkPasswordRecoveryRequestInput.interface";
import type { PasswordRecoveryRequestResult } from "./models/PasswordRecoveryRequestResult.type";
import { schedulePasswordResetPinDelivery } from "./schedulePasswordResetPinDelivery";

export const requestPasswordRecovery = async (
  input: NetworkPasswordRecoveryRequestInput,
  defer: DeferredTask
): Promise<PasswordRecoveryRequestResult> => {
  const validationError =
    validatePasswordRecoveryRequest(input);

  if (validationError) {
    return { error: validationError, ok: false };
  }

  const pin = generatePasswordResetPin();
  const outcome = await attemptPasswordResetPinIssue({
    networkKey: input.networkKey,
    pin,
    username: input.username,
  });

  if (outcome.failed) {
    return {
      error: createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
      ),
      ok: false,
    };
  }

  if (outcome.issued) {
    await schedulePasswordResetPinDelivery(
      defer,
      outcome.issued,
      pin
    );
  }

  return { ok: true };
};
