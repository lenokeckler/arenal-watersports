import { useState } from "react";
import type { NullableRef } from "@/app/types";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import { validateFirstPasswordChange } from "@/app/utils/first-sign-in/validateFirstPasswordChange";
import type { FirstSignInSubmitGuard } from "../models/FirstSignInSubmitGuard.interface";
import type { FirstSignInSubmitHandler } from "../models/FirstSignInSubmitHandler.type";

const nextCount = (count: number): number => count + 1;

export const useFirstSignInSubmitGuard = (
  values: FirstPasswordChangeInput,
  dismissServerError: () => void,
  isPending: boolean
): FirstSignInSubmitGuard => {
  const [invalidSubmitCount, setInvalidSubmitCount] =
    useState(0);
  const [failedNewPassword, setFailedNewPassword] =
    useState<NullableRef<string>>(null);

  const onSubmit: FirstSignInSubmitHandler = (event) => {
    if (isPending) {
      event.preventDefault();
      return;
    }
    if (validateFirstPasswordChange(values) === null) {
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
