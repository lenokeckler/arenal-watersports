import { PERSONAL_EMAIL_FIELD } from "@/app/constants";
import type { PersonalEmailFocusField } from "../models/PersonalEmailFocusField.type";

export const PERSONAL_EMAIL_FOCUS_ORDER: readonly PersonalEmailFocusField[] =
  [
    PERSONAL_EMAIL_FIELD.EMAIL,
    PERSONAL_EMAIL_FIELD.CURRENT_PASSWORD,
  ];

export const NO_HANDLED_PERSONAL_EMAIL_FOCUS_TRIGGER = {
  invalidSubmitCount: 0,
  serverError: null,
} as const;
