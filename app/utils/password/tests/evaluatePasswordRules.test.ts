import { describe, expect, it } from "vitest";
import { PASSWORD_RULE, STRING } from "@/app/constants";
import { evaluatePasswordRules } from "../evaluatePasswordRules";
import {
  buildPasswordOfLength,
  COMPLIANT_PASSWORD,
  LENGTH_CASES,
  NON_ASCII_CHARACTERS,
  PASSWORD_WITH_ONLY_DIGITS,
  PASSWORD_WITH_ONLY_LOWERCASE,
  PASSWORD_WITH_ONLY_SYMBOLS,
  PASSWORD_WITH_ONLY_UPPERCASE,
  PASSWORD_WITHOUT_DIGIT,
  PASSWORD_WITHOUT_LOWERCASE,
  PASSWORD_WITHOUT_SYMBOL,
  PASSWORD_WITHOUT_UPPERCASE,
  SPACE_CHARACTER,
  SUPABASE_SYMBOLS,
} from "./password.constants";

describe("evaluatePasswordRules", () => {
  it("meets every rule with a compliant password", () => {
    expect(
      Object.values(
        evaluatePasswordRules(COMPLIANT_PASSWORD)
      )
    ).toEqual(Object.values(PASSWORD_RULE).map(() => true));
  });

  it("meets no rule for an empty password", () => {
    expect(
      Object.values(evaluatePasswordRules(STRING.Empty))
    ).toEqual(
      Object.values(PASSWORD_RULE).map(() => false)
    );
  });

  it.each(LENGTH_CASES)(
    "evaluates the length rule at %i characters",
    (length, expected) => {
      expect(
        evaluatePasswordRules(
          buildPasswordOfLength(length)
        )[PASSWORD_RULE.LENGTH]
      ).toBe(expected);
    }
  );

  it("fails only the uppercase rule without an uppercase letter", () => {
    expect(
      evaluatePasswordRules(PASSWORD_WITHOUT_UPPERCASE)
    ).toMatchObject({
      [PASSWORD_RULE.LENGTH]: true,
      [PASSWORD_RULE.UPPERCASE]: false,
      [PASSWORD_RULE.LOWERCASE]: true,
      [PASSWORD_RULE.DIGIT]: true,
      [PASSWORD_RULE.SYMBOL]: true,
    });
  });

  it("fails only the lowercase rule without a lowercase letter", () => {
    expect(
      evaluatePasswordRules(PASSWORD_WITHOUT_LOWERCASE)
    ).toMatchObject({
      [PASSWORD_RULE.UPPERCASE]: true,
      [PASSWORD_RULE.LOWERCASE]: false,
      [PASSWORD_RULE.DIGIT]: true,
      [PASSWORD_RULE.SYMBOL]: true,
    });
  });

  it("fails only the digit rule without a number", () => {
    expect(
      evaluatePasswordRules(PASSWORD_WITHOUT_DIGIT)
    ).toMatchObject({
      [PASSWORD_RULE.UPPERCASE]: true,
      [PASSWORD_RULE.LOWERCASE]: true,
      [PASSWORD_RULE.DIGIT]: false,
      [PASSWORD_RULE.SYMBOL]: true,
    });
  });

  it("fails only the symbol rule without a symbol", () => {
    expect(
      evaluatePasswordRules(PASSWORD_WITHOUT_SYMBOL)
    ).toMatchObject({
      [PASSWORD_RULE.UPPERCASE]: true,
      [PASSWORD_RULE.LOWERCASE]: true,
      [PASSWORD_RULE.DIGIT]: true,
      [PASSWORD_RULE.SYMBOL]: false,
    });
  });

  it("meets a single class when only that class is typed", () => {
    expect(
      evaluatePasswordRules(PASSWORD_WITH_ONLY_UPPERCASE)
    ).toMatchObject({
      [PASSWORD_RULE.UPPERCASE]: true,
      [PASSWORD_RULE.LOWERCASE]: false,
      [PASSWORD_RULE.DIGIT]: false,
      [PASSWORD_RULE.SYMBOL]: false,
    });
    expect(
      evaluatePasswordRules(PASSWORD_WITH_ONLY_LOWERCASE)
    ).toMatchObject({
      [PASSWORD_RULE.UPPERCASE]: false,
      [PASSWORD_RULE.LOWERCASE]: true,
    });
    expect(
      evaluatePasswordRules(PASSWORD_WITH_ONLY_DIGITS)
    ).toMatchObject({
      [PASSWORD_RULE.DIGIT]: true,
      [PASSWORD_RULE.SYMBOL]: false,
    });
    expect(
      evaluatePasswordRules(PASSWORD_WITH_ONLY_SYMBOLS)
    ).toMatchObject({
      [PASSWORD_RULE.DIGIT]: false,
      [PASSWORD_RULE.SYMBOL]: true,
    });
  });

  it.each(SUPABASE_SYMBOLS)(
    "meets the symbol rule with %s",
    (symbol) => {
      expect(
        evaluatePasswordRules(symbol)[PASSWORD_RULE.SYMBOL]
      ).toBe(true);
    }
  );

  it.each(NON_ASCII_CHARACTERS)(
    "meets no character class with %s",
    (character) => {
      expect(
        evaluatePasswordRules(character)
      ).toMatchObject({
        [PASSWORD_RULE.UPPERCASE]: false,
        [PASSWORD_RULE.LOWERCASE]: false,
        [PASSWORD_RULE.DIGIT]: false,
        [PASSWORD_RULE.SYMBOL]: false,
      });
    }
  );

  it("meets no character class with a space", () => {
    expect(
      evaluatePasswordRules(SPACE_CHARACTER)
    ).toMatchObject({
      [PASSWORD_RULE.UPPERCASE]: false,
      [PASSWORD_RULE.LOWERCASE]: false,
      [PASSWORD_RULE.DIGIT]: false,
      [PASSWORD_RULE.SYMBOL]: false,
    });
  });

  it("returns the rules in display order", () => {
    expect(
      Object.keys(evaluatePasswordRules(COMPLIANT_PASSWORD))
    ).toEqual(Object.values(PASSWORD_RULE));
  });
});
