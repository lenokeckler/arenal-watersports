import { useState } from "react";
import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { PasswordRecoveryError } from "@/app/utils/password-recovery/models/PasswordRecoveryError.interface";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import { EMPTY_PASSWORD_RECOVERY_RESET_INPUT } from "../constants/PasswordRecoveryResetDefaults.constants";
import { PIN_CLEARING_ERROR_CODES } from "../constants/PasswordRecoveryResetPinClearing.constants";
import type { PasswordRecoveryFieldChangeHandler } from "../models/PasswordRecoveryFieldChangeHandler.type";
import type { PasswordRecoveryResetFormValues } from "../models/PasswordRecoveryResetFormValues.interface";
import { changePasswordRecoveryResetValue } from "../utils/changePasswordRecoveryResetValue";

export const usePasswordRecoveryResetValues = (
  initialUsername: string,
  dismissServerError: () => void,
  serverError: NullableRef<PasswordRecoveryError>
): PasswordRecoveryResetFormValues => {
  const [values, setValues] =
    useState<PasswordRecoveryResetInput>({
      ...EMPTY_PASSWORD_RECOVERY_RESET_INPUT,
      username: initialUsername,
    });
  const [handledError, setHandledError] =
    useState<NullableRef<PasswordRecoveryError>>(null);

  if (
    serverError !== null &&
    serverError !== handledError
  ) {
    setHandledError(serverError);
    if (
      PIN_CLEARING_ERROR_CODES.includes(serverError.code)
    ) {
      setValues({ ...values, pin: STRING.Empty });
    }
  }

  const onChange: PasswordRecoveryFieldChangeHandler = (
    event
  ) => {
    const { name, value } = event.target;
    setValues((current) =>
      changePasswordRecoveryResetValue(current, name, value)
    );
    dismissServerError();
  };

  return { onChange, values };
};
