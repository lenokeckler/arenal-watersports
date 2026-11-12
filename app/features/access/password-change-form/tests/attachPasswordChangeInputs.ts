import { onTestFinished } from "vitest";
import { PASSWORD_CHANGE_FOCUS_ORDER } from "../constants/PasswordChangeFocus.constants";
import type { PasswordChangeFieldRefs } from "../models/PasswordChangeFieldRefs.type";
import type { PasswordChangeFocusField } from "../models/PasswordChangeFocusField.type";

export const attachPasswordChangeInputs = (
  fieldRefs: PasswordChangeFieldRefs
): Record<PasswordChangeFocusField, HTMLInputElement> => {
  const inputs = Object.fromEntries(
    PASSWORD_CHANGE_FOCUS_ORDER.map((field) => {
      const input = document.createElement("input");
      document.body.append(input);
      onTestFinished(() => input.remove());
      fieldRefs[field].current = input;
      return [field, input];
    })
  ) as Record<PasswordChangeFocusField, HTMLInputElement>;
  return inputs;
};
