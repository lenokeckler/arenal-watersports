import { STRING } from "@/app/constants";
import { PASSWORD_CHANGE_FIELD } from "@/app/constants/access/PasswordChangeError.constants";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import type { PasswordChangeFormErrors } from "../models/PasswordChangeFormErrors.type";

export const EMPTY_PASSWORD_CHANGE_INPUT: PasswordChangeInput =
  {
    confirmPassword: STRING.Empty,
    currentPassword: STRING.Empty,
    newPassword: STRING.Empty,
  };

export const NO_PASSWORD_CHANGE_FORM_ERRORS: PasswordChangeFormErrors =
  {
    [PASSWORD_CHANGE_FIELD.CONFIRM_PASSWORD]: null,
    [PASSWORD_CHANGE_FIELD.CURRENT_PASSWORD]: null,
    [PASSWORD_CHANGE_FIELD.FORM]: null,
    [PASSWORD_CHANGE_FIELD.NEW_PASSWORD]: null,
  };
