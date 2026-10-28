import { STRING } from "@/app/constants";
import type { PasswordRecoveryResetInput } from "@/app/utils/password-recovery/models/PasswordRecoveryResetInput.interface";
import { RESET_INPUT } from "./passwordRecoveryReset.constants";

const WEAK_PASSWORD = "abc";
const OTHER_PASSWORD = "Otra#Clave22";
const SHORT_PIN = "123";

export const NO_PIN_INPUT: PasswordRecoveryResetInput = {
  ...RESET_INPUT,
  pin: STRING.Empty,
};
export const SHORT_PIN_INPUT: PasswordRecoveryResetInput = {
  ...RESET_INPUT,
  pin: SHORT_PIN,
};
export const NO_NEW_PASSWORD_INPUT: PasswordRecoveryResetInput =
  { ...RESET_INPUT, newPassword: STRING.Empty };
export const WEAK_PASSWORD_INPUT: PasswordRecoveryResetInput =
  {
    ...RESET_INPUT,
    confirmPassword: WEAK_PASSWORD,
    newPassword: WEAK_PASSWORD,
  };
export const NO_CONFIRMATION_INPUT: PasswordRecoveryResetInput =
  { ...RESET_INPUT, confirmPassword: STRING.Empty };
export const MISMATCH_INPUT: PasswordRecoveryResetInput = {
  ...RESET_INPUT,
  confirmPassword: OTHER_PASSWORD,
};
