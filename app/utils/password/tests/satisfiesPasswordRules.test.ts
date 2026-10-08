import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { satisfiesPasswordRules } from "../satisfiesPasswordRules";
import {
  buildPasswordOfLength,
  COMPLIANT_PASSWORD,
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
});
