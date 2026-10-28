import { useState } from "react";
import { nextCount } from "@/app/utils/form-submit/nextCount";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";
import { validatePasswordRecoveryPin } from "@/app/utils/password-recovery/validatePasswordRecoveryPin";
import type { PasswordRecoveryRequestSubmitGuard } from "../models/PasswordRecoveryRequestSubmitGuard.interface";
import type { PasswordRecoverySubmitHandler } from "../models/PasswordRecoverySubmitHandler.type";

export const usePasswordRecoveryResetSubmitGuard = (
  values: PasswordRecoveryPinInput,
  dismissServerError: () => void,
  isPending: boolean
): PasswordRecoveryRequestSubmitGuard => {
  const [invalidSubmitCount, setInvalidSubmitCount] =
    useState(0);

  const onSubmit: PasswordRecoverySubmitHandler = (
    event
  ) => {
    if (isPending) {
      event.preventDefault();
      return;
    }
    if (validatePasswordRecoveryPin(values) === null) {
      return;
    }
    event.preventDefault();
    dismissServerError();
    setInvalidSubmitCount(nextCount);
  };

  return {
    hasSubmitted: invalidSubmitCount > 0,
    invalidSubmitCount,
    onSubmit,
  };
};
