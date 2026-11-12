import { useState } from "react";
import type { PasswordRecoveryRequestInput } from "@/app/utils/password-recovery/models/PasswordRecoveryRequestInput.interface";
import { EMPTY_PASSWORD_RECOVERY_REQUEST_INPUT } from "../constants/PasswordRecoveryRequestDefaults.constants";
import type { PasswordRecoveryFieldChangeHandler } from "../models/PasswordRecoveryFieldChangeHandler.type";
import type { PasswordRecoveryRequestFormValues } from "../models/PasswordRecoveryRequestFormValues.interface";

export const usePasswordRecoveryRequestValues = (
  dismissServerError: () => void
): PasswordRecoveryRequestFormValues => {
  const [values, setValues] =
    useState<PasswordRecoveryRequestInput>(
      EMPTY_PASSWORD_RECOVERY_REQUEST_INPUT
    );

  const onChange: PasswordRecoveryFieldChangeHandler = (
    event
  ) => {
    setValues({ username: event.target.value });
    dismissServerError();
  };

  return { onChange, values };
};
