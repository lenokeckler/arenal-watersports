import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { hasLowercase } from "../hasLowercase";
import {
  CHARACTER_AFTER_LOWERCASE,
  CHARACTER_BEFORE_LOWERCASE,
  NON_ASCII_CHARACTERS,
  PASSWORD_WITH_ONLY_LOWERCASE,
  PASSWORD_WITHOUT_LOWERCASE,
} from "./password.constants";

describe("hasLowercase", () => {
  it("accepts a password with the class", () => {
    expect(hasLowercase(PASSWORD_WITH_ONLY_LOWERCASE)).toBe(
      true
    );
  });

  it("rejects a password without the class", () => {
    expect(hasLowercase(PASSWORD_WITHOUT_LOWERCASE)).toBe(
      false
    );
  });

  it("rejects the characters next to the ASCII range", () => {
    expect(
      hasLowercase(
        CHARACTER_BEFORE_LOWERCASE +
          CHARACTER_AFTER_LOWERCASE
      )
    ).toBe(false);
  });

  it.each(NON_ASCII_CHARACTERS)(
    "does not count %s",
    (character) => {
      expect(hasLowercase(character)).toBe(false);
    }
  );

  it("rejects an empty password", () => {
    expect(hasLowercase(STRING.Empty)).toBe(false);
  });
});
