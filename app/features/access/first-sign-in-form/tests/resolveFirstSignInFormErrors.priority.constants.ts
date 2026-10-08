import { STRING } from "@/app/constants";
import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "@/app/utils/first-sign-in/tests/firstSignIn.constants";

export const EMPTY_CURRENT_PASSWORD_INPUT: FirstPasswordChangeInput =
  {
    ...DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
    currentPassword: STRING.Empty,
  };
