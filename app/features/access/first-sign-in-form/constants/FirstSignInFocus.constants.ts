import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import type { FirstSignInFocusField } from "../models/FirstSignInFocusField.type";

export const FIRST_SIGN_IN_FOCUS_ORDER: readonly FirstSignInFocusField[] =
  [
    FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD,
    FIRST_SIGN_IN_FIELD.NEW_PASSWORD,
    FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD,
  ];

export const NO_HANDLED_FOCUS_TRIGGER = {
  invalidSubmitCount: 0,
  serverError: null,
} as const;
