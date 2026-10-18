import {
  PASSWORD_LENGTH,
  PASSWORD_RECOVERY_ERROR_CODE,
  PASSWORD_RESET_PIN,
  STRING,
} from "@/app/constants";
import type { PasswordRecoveryResetInput } from "../models/PasswordRecoveryResetInput.interface";

export const DEFAULT_PASSWORD_RECOVERY_RESET_INPUT: PasswordRecoveryResetInput =
  {
    confirmPassword: "Nueva-clave-1!",
    newPassword: "Nueva-clave-1!",
    pin: "482913",
    username: "admin",
  };

export const VALID_PIN =
  DEFAULT_PASSWORD_RECOVERY_RESET_INPUT.pin;
export const VALID_PIN_WITH_SPACES = "482 913";
export const VALID_PIN_WITH_MIXED_WHITESPACE =
  " 48\t29\n13 ";
export const VALID_PIN_WITH_NO_BREAK_SPACE = "482\u00A0913";
export const EMPTY_PIN = STRING.Empty;
export const BLANK_PIN = "  \t ";
export const PIN_ONE_DIGIT_SHORT = "0".repeat(
  PASSWORD_RESET_PIN.LENGTH - 1
);
export const PIN_ONE_DIGIT_LONG = "0".repeat(
  PASSWORD_RESET_PIN.LENGTH + 1
);
export const PIN_WITH_LETTER = "48291a";
export const PIN_WITH_SYMBOL = "48291-";
export const PIN_WITH_ARABIC_INDIC_DIGITS = "٤٨٢٩١٣";
export const PIN_WITH_FULL_WIDTH_DIGITS = "４８２９１３";
export const PIN_WITH_LETTERS_AFTER_NEWLINE = "482913\nabc";
export const VALID_PIN_WITH_TRAILING_NEWLINE = "482913\n";
export const UNLISTED_ERROR_CODE = "notARecoveryCode";

export const SHORT_USERNAME = "ab";
export const WEAK_NEW_PASSWORD = "nueva";
export const MISMATCHED_CONFIRMATION = "Otra-clave-2!";

export const PIN_WITH_LEADING_ZEROS = "000123";
export const PIN_ALL_ZEROS = "0".repeat(
  PASSWORD_RESET_PIN.LENGTH
);
export const PIN_WITH_LEADING_ZEROS_AND_SPACES =
  "0 0 0 1 2 3";
export const PIN_PAIRS_OF_DIGITS = "12 34 56";
export const PIN_FIVE_DIGITS_WITH_SPACES = "12 34 5";
export const PIN_SEVEN_DIGITS_WITH_SPACES = "12 34 56 7";
export const PIN_WITH_ZERO_WIDTH_SPACE = "482\u200B913";
export const PIN_WITH_BYTE_ORDER_MARK = "\uFEFF482913";
export const PIN_ONLY_ZERO_WIDTH_SPACE = "\u200B";
export const PIN_WITH_LINE_SEPARATOR = "482\u2028913";
export const PIN_WITH_IDEOGRAPHIC_SPACE = "482\u3000913";

export const UNNORMALIZED_USERNAME = "  ADMIN\t";
export const OVERLONG_NEW_PASSWORD = "Aa1!".repeat(
  PASSWORD_LENGTH.MAX
);

export const SHARED_CODES = [
  PASSWORD_RECOVERY_ERROR_CODE.CONFIRMATION_MISMATCH,
  PASSWORD_RECOVERY_ERROR_CODE.CONFIRMATION_REQUIRED,
  PASSWORD_RECOVERY_ERROR_CODE.NETWORK,
  PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_REQUIRED,
  PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_RULES,
  PASSWORD_RECOVERY_ERROR_CODE.NEW_PASSWORD_TOO_LONG,
  PASSWORD_RECOVERY_ERROR_CODE.TOO_MANY_REQUESTS,
  PASSWORD_RECOVERY_ERROR_CODE.UNKNOWN,
] as const;
export const REPEATED_CALLS = 4;
export const INHERITED_OBJECT_KEYS = [
  "toString",
  "constructor",
  "__proto__",
] as const;
