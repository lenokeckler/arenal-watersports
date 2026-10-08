import { onTestFinished } from "vitest";
import { FIRST_SIGN_IN_FOCUS_ORDER } from "../constants/FirstSignInFocus.constants";
import type { FirstSignInFieldRefs } from "../models/FirstSignInFieldRefs.type";
import type { FirstSignInFocusField } from "../models/FirstSignInFocusField.type";

export const attachFirstSignInInputs = (
  fieldRefs: FirstSignInFieldRefs
): Record<FirstSignInFocusField, HTMLInputElement> => {
  const inputs = Object.fromEntries(
    FIRST_SIGN_IN_FOCUS_ORDER.map((field) => {
      const input = document.createElement("input");
      document.body.append(input);
      onTestFinished(() => input.remove());
      fieldRefs[field].current = input;
      return [field, input];
    })
  ) as Record<FirstSignInFocusField, HTMLInputElement>;
  return inputs;
};
