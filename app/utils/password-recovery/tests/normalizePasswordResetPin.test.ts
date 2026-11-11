import { describe, expect, it } from "vitest";
import { normalizePasswordResetPin } from "../normalizePasswordResetPin";
import {
  BLANK_PIN,
  EMPTY_PIN,
  VALID_PIN,
  VALID_PIN_WITH_MIXED_WHITESPACE,
  VALID_PIN_WITH_NO_BREAK_SPACE,
  VALID_PIN_WITH_SPACES,
} from "./passwordRecovery.constants";

describe("normalizePasswordResetPin", () => {
  it("leaves a clean PIN untouched", () => {
    expect(normalizePasswordResetPin(VALID_PIN)).toBe(
      VALID_PIN
    );
  });

  it.each([
    VALID_PIN_WITH_SPACES,
    VALID_PIN_WITH_MIXED_WHITESPACE,
    VALID_PIN_WITH_NO_BREAK_SPACE,
  ])(
    "removes every whitespace character from %j",
    (pin) => {
      expect(normalizePasswordResetPin(pin)).toBe(
        VALID_PIN
      );
    }
  );

  it("returns an empty string for blank input", () => {
    expect(normalizePasswordResetPin(BLANK_PIN)).toBe(
      EMPTY_PIN
    );
  });
});
