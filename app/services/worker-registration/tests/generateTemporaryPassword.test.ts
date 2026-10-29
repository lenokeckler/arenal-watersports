import { describe, expect, it } from "vitest";
import {
  STRING,
  TEMPORARY_PASSWORD,
} from "@/app/constants";
import { satisfiesPasswordRules } from "@/app/utils/password/satisfiesPasswordRules";
import { generateTemporaryPassword } from "../generateTemporaryPassword";
import { TEMPORARY_PASSWORD_SAMPLE_SIZE } from "./WorkerRegistrationService.constants";

const ALL_CHARACTERS =
  TEMPORARY_PASSWORD.CHARACTER_SETS.join(STRING.Empty);

const samplePasswords = (): string[] =>
  Array.from(
    { length: TEMPORARY_PASSWORD_SAMPLE_SIZE },
    generateTemporaryPassword
  );

describe("generateTemporaryPassword", () => {
  const passwords = samplePasswords();

  it("always meets the password rules", () => {
    expect(passwords.every(satisfiesPasswordRules)).toBe(
      true
    );
  });

  it("always has the fixed length", () => {
    expect(
      passwords.every(
        (password) =>
          password.length === TEMPORARY_PASSWORD.LENGTH
      )
    ).toBe(true);
  });

  it("uses only the allowed characters", () => {
    expect(
      passwords.every((password) =>
        Array.from(password).every((character) =>
          ALL_CHARACTERS.includes(character)
        )
      )
    ).toBe(true);
  });

  it.each(TEMPORARY_PASSWORD.CHARACTER_SETS)(
    "always takes at least one character from %s",
    (characterSet) => {
      expect(
        passwords.every((password) =>
          Array.from(password).some((character) =>
            characterSet.includes(character)
          )
        )
      ).toBe(true);
    }
  );

  it("never repeats a password in the sample", () => {
    expect(new Set(passwords).size).toBe(passwords.length);
  });
});
