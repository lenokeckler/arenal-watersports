import { useState } from "react";
import { nextCount } from "@/app/utils/form-submit/nextCount";
import type { PasswordRecoveryRequestInput } from "@/app/utils/password-recovery/models/PasswordRecoveryRequestInput.interface";
import { validatePasswordRecoveryRequest } from "@/app/utils/password-recovery/validatePasswordRecoveryRequest";
import type { PasswordRecoveryRequestSubmitGuard } from "../models/PasswordRecoveryRequestSubmitGuard.interface";
import type { PasswordRecoverySubmitHandler } from "../models/PasswordRecoverySubmitHandler.type";

export const usePasswordRecoveryRequestSubmitGuard = (
  values: PasswordRecoveryRequestInput,
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
    if (validatePasswordRecoveryRequest(values) === null) {
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
