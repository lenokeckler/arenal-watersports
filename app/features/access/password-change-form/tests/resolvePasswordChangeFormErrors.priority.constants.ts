import { STRING } from "@/app/constants";
import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "@/app/utils/password-change/tests/passwordChange.constants";

export const EMPTY_CURRENT_PASSWORD_INPUT: PasswordChangeInput =
  {
    ...DEFAULT_PASSWORD_CHANGE_INPUT,
    currentPassword: STRING.Empty,
  };
