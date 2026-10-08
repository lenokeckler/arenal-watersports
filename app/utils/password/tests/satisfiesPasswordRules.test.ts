import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { satisfiesPasswordRules } from "../satisfiesPasswordRules";
import {
  buildPasswordOfLength,
  COMPLIANT_PASSWORD,
  EMOJI_AS_ONLY_SYMBOL,
  EMOJI_PASSWORD_ABOVE_MAX_LENGTH_IN_CODE_UNITS,
  EMOJI_PASSWORD_AT_MAX_LENGTH_IN_CODE_UNITS,
  EMOJI_PASSWORD_AT_MIN_LENGTH_IN_CODE_UNITS,
  LOOKALIKE_CLASS_PASSWORDS,
  PASSWORD_WITHOUT_DIGIT,
  PASSWORD_WITHOUT_LOWERCASE,
  PASSWORD_WITHOUT_SYMBOL,
  PASSWORD_WITHOUT_UPPERCASE,
} from "./password.constants";

const NON_COMPLIANT_PASSWORDS = [
  PASSWORD_WITHOUT_UPPERCASE,
  PASSWORD_WITHOUT_LOWERCASE,
  PASSWORD_WITHOUT_DIGIT,
  PASSWORD_WITHOUT_SYMBOL,
  buildPasswordOfLength(1),
  STRING.Empty,
  EMOJI_AS_ONLY_SYMBOL,
  EMOJI_PASSWORD_ABOVE_MAX_LENGTH_IN_CODE_UNITS,
  ...LOOKALIKE_CLASS_PASSWORDS,
];

const CODE_UNIT_COUNTED_PASSWORDS = [
  EMOJI_PASSWORD_AT_MIN_LENGTH_IN_CODE_UNITS,
  EMOJI_PASSWORD_AT_MAX_LENGTH_IN_CODE_UNITS,
];

describe("satisfiesPasswordRules", () => {
  it("accepts a password that meets every rule", () => {
    expect(satisfiesPasswordRules(COMPLIANT_PASSWORD)).toBe(
      true
    );
  });

  it.each(NON_COMPLIANT_PASSWORDS)(
    "rejects %j",
    (password) => {
      expect(satisfiesPasswordRules(password)).toBe(false);
    }
  );

  it.each(CODE_UNIT_COUNTED_PASSWORDS)(
    "counts each emoji as two characters of length in %j",
    (password) => {
      expect(satisfiesPasswordRules(password)).toBe(true);
    }
  );
});
