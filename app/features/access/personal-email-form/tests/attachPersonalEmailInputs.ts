import { onTestFinished } from "vitest";
import { PERSONAL_EMAIL_FOCUS_ORDER } from "../constants/PersonalEmailFocus.constants";
import type { PersonalEmailFieldRefs } from "../models/PersonalEmailFieldRefs.type";
import type { PersonalEmailFocusField } from "../models/PersonalEmailFocusField.type";

export const attachPersonalEmailInputs = (
  fieldRefs: PersonalEmailFieldRefs
): Record<PersonalEmailFocusField, HTMLInputElement> =>
  Object.fromEntries(
    PERSONAL_EMAIL_FOCUS_ORDER.map((field) => {
      const input = document.createElement("input");
      document.body.append(input);
      onTestFinished(() => input.remove());
      fieldRefs[field].current = input;
      return [field, input];
    })
  ) as Record<PersonalEmailFocusField, HTMLInputElement>;
