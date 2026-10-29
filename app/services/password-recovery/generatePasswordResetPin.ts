import { randomInt } from "node:crypto";
import { PASSWORD_RESET_PIN } from "@/app/constants";

export const generatePasswordResetPin = (): string =>
  randomInt(
    0,
    PASSWORD_RESET_PIN.RADIX ** PASSWORD_RESET_PIN.LENGTH
  )
    .toString(PASSWORD_RESET_PIN.RADIX)
    .padStart(
      PASSWORD_RESET_PIN.LENGTH,
      PASSWORD_RESET_PIN.PAD_CHARACTER
    );
