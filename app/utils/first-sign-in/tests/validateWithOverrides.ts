import type { FirstPasswordChangeInput } from "../models/FirstPasswordChangeInput.interface";
import { validateFirstPasswordChange } from "../validateFirstPasswordChange";
import { DEFAULT_FIRST_PASSWORD_CHANGE_INPUT } from "./firstSignIn.constants";

export const validateWithOverrides = (
  overrides: Partial<FirstPasswordChangeInput>
) =>
  validateFirstPasswordChange({
    ...DEFAULT_FIRST_PASSWORD_CHANGE_INPUT,
    ...overrides,
  });
