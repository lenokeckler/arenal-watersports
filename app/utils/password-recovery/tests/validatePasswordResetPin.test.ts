import { describe, expect, it } from "vitest";
import { PASSWORD_RECOVERY_ERROR_CODE } from "@/app/constants";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";
import { validatePasswordResetPin } from "../validatePasswordResetPin";
import {
  BLANK_PIN,
  EMPTY_PIN,
  PIN_ONE_DIGIT_LONG,
  PIN_ONE_DIGIT_SHORT,
  PIN_WITH_ARABIC_INDIC_DIGITS,
  PIN_WITH_FULL_WIDTH_DIGITS,
  PIN_WITH_LETTER,
  PIN_WITH_NEWLINE_SUFFIX,
  PIN_WITH_SYMBOL,
  VALID_PIN,
  VALID_PIN_WITH_MIXED_WHITESPACE,
  VALID_PIN_WITH_NO_BREAK_SPACE,
  VALID_PIN_WITH_SPACES,
} from "./passwordRecovery.constants";

const pinFormatError = createPasswordRecoveryError(
  PASSWORD_RECOVERY_ERROR_CODE.PIN_FORMAT
);

describe("validatePasswordResetPin", () => {
  it.each([
    VALID_PIN,
    VALID_PIN_WITH_SPACES,
    VALID_PIN_WITH_MIXED_WHITESPACE,
    VALID_PIN_WITH_NO_BREAK_SPACE,
  ])("accepts %j", (pin) => {
    expect(validatePasswordResetPin(pin)).toBeNull();
  });

  it.each([EMPTY_PIN, BLANK_PIN])(
    "requires a PIN when the input is %j",
    (pin) => {
      expect(validatePasswordResetPin(pin)).toEqual(
        createPasswordRecoveryError(
          PASSWORD_RECOVERY_ERROR_CODE.PIN_REQUIRED
        )
      );
    }
  );

  it.each([
    ["one digit short", PIN_ONE_DIGIT_SHORT],
    ["one digit long", PIN_ONE_DIGIT_LONG],
    ["a letter", PIN_WITH_LETTER],
    ["a symbol", PIN_WITH_SYMBOL],
    ["Arabic-Indic digits", PIN_WITH_ARABIC_INDIC_DIGITS],
    ["full-width digits", PIN_WITH_FULL_WIDTH_DIGITS],
    [
      "trailing text after a newline",
      PIN_WITH_NEWLINE_SUFFIX,
    ],
  ])("rejects a PIN with %s", (_label, pin) => {
    expect(validatePasswordResetPin(pin)).toEqual(
      pinFormatError
    );
  });
});
