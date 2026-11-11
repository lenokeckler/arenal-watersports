import { useState } from "react";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { EMPTY_PASSWORD_CHANGE_INPUT } from "../constants/PasswordChangeDefaults.constants";
import type { PasswordChangeFieldChangeHandler } from "../models/PasswordChangeFieldChangeHandler.type";
import type { PasswordChangeFormValues } from "../models/PasswordChangeFormValues.interface";
import { isPasswordChangeKey } from "../utils/isPasswordChangeKey";

export const usePasswordChangeFormValues = (
  onEdit: () => void
): PasswordChangeFormValues => {
  const [values, setValues] = useState<PasswordChangeInput>(
    EMPTY_PASSWORD_CHANGE_INPUT
  );

  const onChange: PasswordChangeFieldChangeHandler = (
    event
  ) => {
    const { name, value } = event.target;
    if (!isPasswordChangeKey(name)) {
      return;
    }
    setValues((current) => ({ ...current, [name]: value }));
    onEdit();
  };

  return { onChange, values };
};
