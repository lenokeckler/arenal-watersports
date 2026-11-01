import { describe, expect, it } from "vitest";
import { PASSWORD_RULE, STRING } from "@/app/constants";
import { evaluatePasswordRules } from "../evaluatePasswordRules";
import {
  COMPLIANT_PASSWORD,
  PASSWORD_WITHOUT_DIGIT,
  PASSWORD_WITHOUT_LOWERCASE,
  PASSWORD_WITHOUT_SYMBOL,
  PASSWORD_WITHOUT_UPPERCASE,
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

  it("returns the rules in display order", () => {
    expect(
      Object.keys(evaluatePasswordRules(COMPLIANT_PASSWORD))
    ).toEqual(Object.values(PASSWORD_RULE));
  });
});
