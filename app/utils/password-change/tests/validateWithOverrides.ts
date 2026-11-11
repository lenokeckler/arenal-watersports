import type { PasswordChangeInput } from "../models/PasswordChangeInput.interface";
import { validatePasswordChange } from "../validatePasswordChange";
import { DEFAULT_PASSWORD_CHANGE_INPUT } from "./passwordChange.constants";

export const validateWithOverrides = (
  overrides: Partial<PasswordChangeInput>
) =>
  validatePasswordChange({
    ...DEFAULT_PASSWORD_CHANGE_INPUT,
    ...overrides,
  });
