import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";
import type { PasswordRecoveryResetValuesProps } from "./PasswordRecoveryResetValuesProps.interface";

export const PREFILLED_USERNAME = "ana.perez";
export const OTHER_USERNAME = "luis.mora";
export const VALID_PIN = "123456";
export const PASTED_PIN = "12 34-56 78";
export const PASTED_PIN_DIGITS = "123456";
export const LETTERS_ONLY_PIN = "abc";
export const SPACED_USERNAME = " ana .perez ";
export const SHORT_PIN = "123";
export const UNRELATED_FIELD_NAME = "unrelated";
export const UNRELATED_FIELD_VALUE = "x";
export const INHERITED_FIELD_NAMES = [
  "constructor",
  "toString",
  "__proto__",
] as const;

export const VALID_RESET_VALUES: PasswordRecoveryPinInput =
  {
    pin: VALID_PIN,
    username: PREFILLED_USERNAME,
  };

export const NO_SERVER_ERROR_PROPS: PasswordRecoveryResetValuesProps =
  { serverError: null };
