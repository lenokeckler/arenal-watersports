import { useState } from "react";
import type { NullableRef } from "@/app/types";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { validatePasswordChange } from "@/app/utils/password-change/validatePasswordChange";
import type { PasswordChangeSubmitGuard } from "../models/PasswordChangeSubmitGuard.interface";
import type { PasswordChangeSubmitHandler } from "../models/PasswordChangeSubmitHandler.type";

const nextCount = (count: number): number => count + 1;

export const usePasswordChangeSubmitGuard = (
  values: PasswordChangeInput,
  dismissServerError: () => void,
  isPending: boolean
): PasswordChangeSubmitGuard => {
  const [invalidSubmitCount, setInvalidSubmitCount] =
    useState(0);
  const [failedNewPassword, setFailedNewPassword] =
    useState<NullableRef<string>>(null);

  const onSubmit: PasswordChangeSubmitHandler = (event) => {
    if (isPending) {
      event.preventDefault();
      return;
    }
    if (validatePasswordChange(values) === null) {
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
