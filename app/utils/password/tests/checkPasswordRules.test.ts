import { describe, expect, it } from "vitest";
import {
  PASSWORD_RULE_ID,
  PASSWORD_RULE_ORDER,
} from "@/app/constants";
import type { PasswordRuleId } from "@/app/constants";
import { checkPasswordRules } from "../checkPasswordRules";
import {
  EMPTY_PASSWORD,
  PASSWORD_AT_MAX,
  PASSWORD_AT_MIN,
  PASSWORD_ONE_ABOVE_MAX,
  PASSWORD_ONE_BELOW_MIN,
  PASSWORD_WITHOUT_DIGIT,
  PASSWORD_WITHOUT_LOWERCASE,
  PASSWORD_WITHOUT_SYMBOL,
  PASSWORD_WITHOUT_UPPERCASE,
  PASSWORD_WITH_ACCENTED_LOWERCASE,
  PASSWORD_WITH_ACCENTED_UPPERCASE,
  PASSWORD_WITH_SPACE_ONLY,
  VALID_PASSWORD,
} from "./checkPasswordRules.constants";

const isRuleMet = (
  password: string,
  id: PasswordRuleId
): boolean | undefined =>
  checkPasswordRules(password).find(
    (result) => result.id === id
  )?.isMet;

describe("checkPasswordRules", () => {
  it("returns one result per rule in display order", () => {
    const results = checkPasswordRules(VALID_PASSWORD);

    expect(results.map((result) => result.id)).toEqual([
      ...PASSWORD_RULE_ORDER,
    ]);
  });

  it("meets every rule for a valid password", () => {
    const results = checkPasswordRules(VALID_PASSWORD);

    expect(results.every((result) => result.isMet)).toBe(
      true
    );
  });

  it.each([
    [
      PASSWORD_RULE_ID.UPPERCASE,
      PASSWORD_WITHOUT_UPPERCASE,
    ],
    [
      PASSWORD_RULE_ID.LOWERCASE,
      PASSWORD_WITHOUT_LOWERCASE,
    ],
    [PASSWORD_RULE_ID.DIGIT, PASSWORD_WITHOUT_DIGIT],
    [PASSWORD_RULE_ID.SYMBOL, PASSWORD_WITHOUT_SYMBOL],
  ])(
    "fails %s when the password lacks it",
    (id, password) => {
      expect(isRuleMet(password, id)).toBe(false);
    }
  );

  it("does not count a space as a symbol", () => {
    expect(
      isRuleMet(
        PASSWORD_WITH_SPACE_ONLY,
        PASSWORD_RULE_ID.SYMBOL
      )
    ).toBe(false);
  });

  it("counts accented letters as uppercase and lowercase", () => {
    expect(
      isRuleMet(
        PASSWORD_WITH_ACCENTED_UPPERCASE,
        PASSWORD_RULE_ID.UPPERCASE
      )
    ).toBe(true);
    expect(
      isRuleMet(
        PASSWORD_WITH_ACCENTED_LOWERCASE,
        PASSWORD_RULE_ID.LOWERCASE
      )
    ).toBe(true);
  });

  it("enforces the minimum length boundary", () => {
    expect(
      isRuleMet(
        PASSWORD_ONE_BELOW_MIN,
        PASSWORD_RULE_ID.MIN_LENGTH
      )
    ).toBe(false);
    expect(
      isRuleMet(
        PASSWORD_AT_MIN,
        PASSWORD_RULE_ID.MIN_LENGTH
      )
    ).toBe(true);
  });

  it("enforces the maximum length boundary", () => {
    expect(
      isRuleMet(
        PASSWORD_AT_MAX,
        PASSWORD_RULE_ID.MAX_LENGTH
      )
    ).toBe(true);
    expect(
      isRuleMet(
        PASSWORD_ONE_ABOVE_MAX,
        PASSWORD_RULE_ID.MAX_LENGTH
      )
    ).toBe(false);
  });

  it("meets only the maximum length rule for an empty password", () => {
    const metIds = checkPasswordRules(EMPTY_PASSWORD)
      .filter((result) => result.isMet)
      .map((result) => result.id);

    expect(metIds).toEqual([PASSWORD_RULE_ID.MAX_LENGTH]);
  });
});
