import { useState } from "react";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import { EMPTY_FIRST_PASSWORD_CHANGE_INPUT } from "../constants/FirstSignInDefaults.constants";
import type { FirstSignInChangeHandler } from "../models/FirstSignInChangeHandler.type";
import type { FirstSignInFormValues } from "../models/FirstSignInFormValues.interface";
import { isFirstPasswordChangeKey } from "../utils/isFirstPasswordChangeKey";

export const useFirstSignInFormValues = (
  onEdit: () => void
): FirstSignInFormValues => {
  const [values, setValues] =
    useState<FirstPasswordChangeInput>(
      EMPTY_FIRST_PASSWORD_CHANGE_INPUT
    );

  const onChange: FirstSignInChangeHandler = (event) => {
    const { name, value } = event.target;
    if (!isFirstPasswordChangeKey(name)) {
      return;
    }
    setValues((current) => ({ ...current, [name]: value }));
    onEdit();
  };

  return { onChange, values };
};
