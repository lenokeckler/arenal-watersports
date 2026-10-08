import type { FirstPasswordChangeInput } from "@/app/utils/first-sign-in/models/FirstPasswordChangeInput.interface";
import { EMPTY_FIRST_PASSWORD_CHANGE_INPUT } from "../constants/FirstSignInDefaults.constants";

export const isFirstPasswordChangeKey = (
  name: string
): name is keyof FirstPasswordChangeInput =>
  Object.hasOwn(EMPTY_FIRST_PASSWORD_CHANGE_INPUT, name);
