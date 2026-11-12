import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { hasDigit } from "../hasDigit";
import {
  CHARACTER_AFTER_DIGIT,
  CHARACTER_BEFORE_DIGIT,
  NON_ASCII_CHARACTERS,
  PASSWORD_WITH_ONLY_DIGITS,
  PASSWORD_WITHOUT_DIGIT,
} from "./password.constants";

describe("hasDigit", () => {
  it("accepts a password with the class", () => {
    expect(hasDigit(PASSWORD_WITH_ONLY_DIGITS)).toBe(true);
  });

  it("rejects a password without the class", () => {
    expect(hasDigit(PASSWORD_WITHOUT_DIGIT)).toBe(false);
  });

  it("rejects the characters next to the ASCII range", () => {
    expect(
      hasDigit(
        CHARACTER_BEFORE_DIGIT + CHARACTER_AFTER_DIGIT
      )
    ).toBe(false);
  });

  it.each(NON_ASCII_CHARACTERS)(
    "does not count %s",
    (character) => {
      expect(hasDigit(character)).toBe(false);
    }
  );

  it("rejects an empty password", () => {
    expect(hasDigit(STRING.Empty)).toBe(false);
  });
});
