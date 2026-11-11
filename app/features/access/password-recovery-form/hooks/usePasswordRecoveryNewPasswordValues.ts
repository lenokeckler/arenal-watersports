import { useState } from "react";
import type { PasswordRecoveryNewPasswordInput } from "@/app/utils/password-recovery/models/PasswordRecoveryNewPasswordInput.interface";
import { EMPTY_PASSWORD_RECOVERY_NEW_PASSWORD_INPUT } from "../constants/PasswordRecoveryNewPasswordDefaults.constants";
import type { PasswordRecoveryFieldChangeHandler } from "../models/PasswordRecoveryFieldChangeHandler.type";
import type { PasswordRecoveryNewPasswordFormValues } from "../models/PasswordRecoveryNewPasswordFormValues.interface";
import { changePasswordRecoveryNewPasswordValue } from "../utils/changePasswordRecoveryNewPasswordValue";

export const usePasswordRecoveryNewPasswordValues = (
  dismissServerError: () => void
): PasswordRecoveryNewPasswordFormValues => {
  const [values, setValues] =
    useState<PasswordRecoveryNewPasswordInput>(
      EMPTY_PASSWORD_RECOVERY_NEW_PASSWORD_INPUT
    );

  const onChange: PasswordRecoveryFieldChangeHandler = (
    event
  ) => {
    const { name, value } = event.target;
    setValues((current) =>
      changePasswordRecoveryNewPasswordValue(
        current,
        name,
        value
      )
    );
    dismissServerError();
  };

  return { onChange, values };
};
