import type { PasswordChangeInput } from "@/app/utils/password-change/models/PasswordChangeInput.interface";
import { EMPTY_PASSWORD_CHANGE_INPUT } from "../constants/PasswordChangeDefaults.constants";

export const isPasswordChangeKey = (
  name: string
): name is keyof PasswordChangeInput =>
  Object.hasOwn(EMPTY_PASSWORD_CHANGE_INPUT, name);
