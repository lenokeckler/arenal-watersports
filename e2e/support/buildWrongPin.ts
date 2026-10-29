import {
  PASSWORD_RESET_PIN,
  STRING,
} from "@/app/constants";
import { E2E_RECOVERY_PIN_LIMITS } from "../constants/E2ePasswordRecoveryPin.constants";

export const buildWrongPin = (pin: string): string =>
  Array.from(pin, (digit) =>
    String(
      (Number(digit) +
        E2E_RECOVERY_PIN_LIMITS.DIGIT_SHIFT) %
        PASSWORD_RESET_PIN.RADIX
    )
  ).join(STRING.Empty);
