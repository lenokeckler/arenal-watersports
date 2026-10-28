import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { nextCount } from "@/app/utils/form-submit/nextCount";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import { validatePasswordRecoveryReset } from "@/app/utils/password-recovery/validatePasswordRecoveryReset";
import type { PasswordRecoveryResetSubmitGuard } from "../models/PasswordRecoveryResetSubmitGuard.interface";
import type { PasswordRecoverySubmitHandler } from "../models/PasswordRecoverySubmitHandler.type";

export const usePasswordRecoveryResetSubmitGuard = (
  values: PasswordRecoveryResetInput,
  dismissServerError: () => void,
  isPending: boolean
): PasswordRecoveryResetSubmitGuard => {
  const [invalidSubmitCount, setInvalidSubmitCount] =
    useState(0);
  const [failedNewPassword, setFailedNewPassword] =
    useState<NullableRef<string>>(null);

  const onSubmit: PasswordRecoverySubmitHandler = (
    event
  ) => {
    if (isPending) {
      event.preventDefault();
      return;
    }
    if (validatePasswordRecoveryReset(values) === null) {
      return;
    }
    event.preventDefault();
    dismissServerError();
    setInvalidSubmitCount(nextCount);
    setFailedNewPassword(values.newPassword);
  };

  return {
    hasSubmitted: invalidSubmitCount > 0,
    invalidSubmitCount,
    onSubmit,
    showFailures: failedNewPassword === values.newPassword,
  };
};
