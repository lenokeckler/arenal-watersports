import {
  PASSWORD_RESET_PIN,
  STRING,
} from "@/app/constants";

export const normalizePasswordResetPin = (
  pin: string
): string =>
  pin.replace(PASSWORD_RESET_PIN.WHITESPACE, STRING.Empty);
