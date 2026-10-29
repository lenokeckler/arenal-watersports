import {
  PASSWORD_RESET_PIN,
  STRING,
} from "@/app/constants";

export const keepPasswordRecoveryPinDigits = (
  value: string
): string =>
  value
    .replace(PASSWORD_RESET_PIN.NON_DIGITS, STRING.Empty)
    .slice(0, PASSWORD_RESET_PIN.LENGTH);
