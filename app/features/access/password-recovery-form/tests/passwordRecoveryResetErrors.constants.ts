import { STRING } from "@/app/constants";
import type { PasswordRecoveryPinInput } from "@/app/utils/password-recovery/models/PasswordRecoveryPinInput.interface";
import { RESET_INPUT } from "./passwordRecoveryReset.constants";

const SHORT_PIN = "123";

export const NO_PIN_INPUT: PasswordRecoveryPinInput = {
  ...RESET_INPUT,
  pin: STRING.Empty,
};
export const SHORT_PIN_INPUT: PasswordRecoveryPinInput = {
  ...RESET_INPUT,
  pin: SHORT_PIN,
};
