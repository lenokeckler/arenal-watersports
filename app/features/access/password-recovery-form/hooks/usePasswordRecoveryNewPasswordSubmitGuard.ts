import { useState } from "react";
import type { NullableRef } from "@/app/types";
import { nextCount } from "@/app/utils/form-submit/nextCount";
import type { PasswordRecoveryNewPasswordInput } from "@/app/utils/password-recovery/models/PasswordRecoveryNewPasswordInput.interface";
import { validatePasswordRecoveryNewPassword } from "@/app/utils/password-recovery/validatePasswordRecoveryNewPassword";
import type { PasswordRecoveryNewPasswordSubmitGuard } from "../models/PasswordRecoveryNewPasswordSubmitGuard.interface";
import type { PasswordRecoverySubmitHandler } from "../models/PasswordRecoverySubmitHandler.type";

export const usePasswordRecoveryNewPasswordSubmitGuard = (
  values: PasswordRecoveryNewPasswordInput,
  dismissServerError: () => void,
  isPending: boolean
): PasswordRecoveryNewPasswordSubmitGuard => {
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
    if (
      validatePasswordRecoveryNewPassword(values) === null
    ) {
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
