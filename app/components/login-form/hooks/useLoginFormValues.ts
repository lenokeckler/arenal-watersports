import { useState } from "react";
import { SIGN_IN_FIELD } from "@/app/constants/access/SignInError.constants";
import type { SignInCredentials } from "@/app/services/authentication/models/SignInCredentials.interface";
import { EMPTY_SIGN_IN_CREDENTIALS } from "../constants/LoginFormDefaults.constants";
import type { LoginFormFieldChangeHandler } from "../models/LoginFormFieldChangeHandler.type";
import type { LoginFormValues } from "../models/LoginFormValues.interface";

export const useLoginFormValues = (
  onEdit: () => void
): LoginFormValues => {
  const [values, setValues] = useState<SignInCredentials>(
    EMPTY_SIGN_IN_CREDENTIALS
  );

  const createChangeHandler =
    (
      field: keyof SignInCredentials
    ): LoginFormFieldChangeHandler =>
    (event) => {
      const { value } = event.target;
      setValues((current) => ({
        ...current,
        [field]: value,
      }));
      onEdit();
    };

  return {
    handlePasswordChange: createChangeHandler(
      SIGN_IN_FIELD.PASSWORD
    ),
    handleUsernameChange: createChangeHandler(
      SIGN_IN_FIELD.USERNAME
    ),
    values,
  };
};
