import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { createPasswordRecoveryError } from "@/app/utils/password-recovery/createPasswordRecoveryError";
import { validatePasswordRecoveryRequest } from "@/app/utils/password-recovery/validatePasswordRecoveryRequest";
import { deliverPasswordResetPin } from "./deliverPasswordResetPin";
import { generatePasswordResetPin } from "./generatePasswordResetPin";
import { issuePasswordResetPin } from "./issuePasswordResetPin";
import type { IssuedPasswordResetPin } from "./models/IssuedPasswordResetPin.interface";
import type { DeferredTask } from "./models/DeferredTask.type";
import type { NetworkPasswordRecoveryRequestInput } from "./models/NetworkPasswordRecoveryRequestInput.interface";
import type { PasswordRecoveryRequestResult } from "./models/PasswordRecoveryRequestResult.type";

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

  let issued: NullableRef<IssuedPasswordResetPin>;

  try {
    issued = await issuePasswordResetPin({
      networkKey: input.networkKey,
      pin,
      username: input.username,
    });
  } catch {
    return {
      error: createPasswordRecoveryError(
        PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN
      ),
      ok: false,
    };
  }

  if (issued) {
    const delivery = issued;
    defer(() => deliverPasswordResetPin(delivery, pin));
  }

  return { ok: true };
};
