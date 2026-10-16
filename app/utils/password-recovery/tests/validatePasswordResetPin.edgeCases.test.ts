import { describe, expect, it } from "vitest";
import {
  PASSWORD_RECOVERY_ERROR_CODE,
  PASSWORD_RESET_PIN,
} from "@/app/constants";
import { createPasswordRecoveryError } from "../createPasswordRecoveryError";
import { normalizePasswordResetPin } from "../normalizePasswordResetPin";
import { validatePasswordResetPin } from "../validatePasswordResetPin";
import {
  PIN_ALL_ZEROS,
  PIN_FIVE_DIGITS_WITH_SPACES,
  PIN_ONLY_ZERO_WIDTH_SPACE,
  PIN_PAIRS_OF_DIGITS,
  PIN_SEVEN_DIGITS_WITH_SPACES,
  PIN_WITH_BYTE_ORDER_MARK,
  PIN_WITH_IDEOGRAPHIC_SPACE,
  PIN_WITH_LEADING_ZEROS,
  PIN_WITH_LEADING_ZEROS_AND_SPACES,
  PIN_WITH_LINE_SEPARATOR,
  PIN_WITH_ZERO_WIDTH_SPACE,
  VALID_PIN,
} from "./passwordRecovery.constants";

const pinFormatError = createPasswordRecoveryError(
  PASSWORD_RECOVERY_ERROR_CODE.PIN_FORMAT
);

const REPEATED_CALLS = 4;

describe("validatePasswordResetPin edge cases", () => {
  it.each([
    PIN_WITH_LEADING_ZEROS,
    PIN_ALL_ZEROS,
    PIN_WITH_LEADING_ZEROS_AND_SPACES,
    PIN_PAIRS_OF_DIGITS,
    PIN_WITH_LINE_SEPARATOR,
    PIN_WITH_IDEOGRAPHIC_SPACE,
    PIN_WITH_BYTE_ORDER_MARK,
  ])("accepts %j", (pin) => {
    expect(validatePasswordResetPin(pin)).toBeNull();
  });

  it("keeps leading zeros as text after normalizing", () => {
    expect(
      normalizePasswordResetPin(
        PIN_WITH_LEADING_ZEROS_AND_SPACES
      )
    ).toBe(PIN_WITH_LEADING_ZEROS);
  });

  it.each([
    PIN_FIVE_DIGITS_WITH_SPACES,
    PIN_SEVEN_DIGITS_WITH_SPACES,
  ])(
    "rejects %j because the digit count is wrong once whitespace is removed",
    (pin) => {
      expect(validatePasswordResetPin(pin)).toEqual(
        pinFormatError
      );
    }
  );

  it.each([PIN_WITH_ZERO_WIDTH_SPACE])(
    "rejects %j because invisible characters are not whitespace",
    (pin) => {
      expect(validatePasswordResetPin(pin)).toEqual(
        pinFormatError
      );
    }
  );

  it("reports a format error, not a missing PIN, for a lone zero-width space", () => {
    expect(
      validatePasswordResetPin(PIN_ONLY_ZERO_WIDTH_SPACE)
    ).toEqual(pinFormatError);
  });

  it("gives the same answer on repeated calls", () => {
    const answers = Array.from(
      { length: REPEATED_CALLS },
      () => validatePasswordResetPin(VALID_PIN)
    );

    expect(answers).toEqual(
      Array.from({ length: REPEATED_CALLS }, () => null)
    );
  });

  it("keeps the validation pattern free of the global and sticky flags", () => {
    expect(PASSWORD_RESET_PIN.PATTERN.global).toBe(false);
    expect(PASSWORD_RESET_PIN.PATTERN.sticky).toBe(false);
  });
});
