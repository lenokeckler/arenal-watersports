import { STRING } from "@/app/constants";
import { FIRST_SIGN_IN_FIELD } from "@/app/constants/access/FirstSignInError.constants";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import type { FirstSignInFormErrors } from "../models/FirstSignInFormErrors.type";

export const EMPTY_FIRST_PASSWORD_CHANGE_INPUT: FirstPasswordChangeInput =
  {
    confirmPassword: STRING.Empty,
    currentPassword: STRING.Empty,
    newPassword: STRING.Empty,
  };

export const NO_FIRST_SIGN_IN_FORM_ERRORS: FirstSignInFormErrors =
  {
    [FIRST_SIGN_IN_FIELD.CONFIRM_PASSWORD]: null,
    [FIRST_SIGN_IN_FIELD.CURRENT_PASSWORD]: null,
    [FIRST_SIGN_IN_FIELD.FORM]: null,
    [FIRST_SIGN_IN_FIELD.NEW_PASSWORD]: null,
  };
