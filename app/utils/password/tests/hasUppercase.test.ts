import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { hasUppercase } from "../hasUppercase";
import {
  CHARACTER_AFTER_UPPERCASE,
  CHARACTER_BEFORE_UPPERCASE,
  NON_ASCII_CHARACTERS,
  PASSWORD_WITH_ONLY_UPPERCASE,
  PASSWORD_WITHOUT_UPPERCASE,
} from "./password.constants";

describe("hasUppercase", () => {
  it("accepts a password with the class", () => {
    expect(hasUppercase(PASSWORD_WITH_ONLY_UPPERCASE)).toBe(
      true
    );
  });

  it("rejects a password without the class", () => {
    expect(hasUppercase(PASSWORD_WITHOUT_UPPERCASE)).toBe(
      false
    );
  });

  it("rejects the characters next to the ASCII range", () => {
    expect(
      hasUppercase(
        CHARACTER_BEFORE_UPPERCASE +
          CHARACTER_AFTER_UPPERCASE
      )
    ).toBe(false);
  });

  it.each(NON_ASCII_CHARACTERS)(
    "does not count %s",
    (character) => {
      expect(hasUppercase(character)).toBe(false);
    }
  );

  it("rejects an empty password", () => {
    expect(hasUppercase(STRING.Empty)).toBe(false);
  });
});
