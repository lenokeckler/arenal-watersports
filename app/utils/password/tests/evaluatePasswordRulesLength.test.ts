import { describe, expect, it } from "vitest";
import { PASSWORD_RULE } from "@/app/constants";
import { evaluatePasswordRules } from "../evaluatePasswordRules";
import {
  buildPasswordOfLength,
  LENGTH_CASES,
  MAX_LENGTH_PASSWORD_AT_BYTE_LIMIT,
  MAX_LENGTH_PASSWORD_OF_TWO_BYTE_CHARACTERS,
  MAX_LENGTH_PASSWORD_ONE_BYTE_ABOVE_LIMIT,
} from "./password.constants";

const BYTE_CASES: [string, string, boolean][] = [
  [
    "64 characters at the byte limit",
    MAX_LENGTH_PASSWORD_AT_BYTE_LIMIT,
    true,
  ],
  [
    "64 characters one byte above the limit",
    MAX_LENGTH_PASSWORD_ONE_BYTE_ABOVE_LIMIT,
    false,
  ],
  [
    "64 two-byte characters",
    MAX_LENGTH_PASSWORD_OF_TWO_BYTE_CHARACTERS,
    false,
  ],
];

describe("evaluatePasswordRules length rule", () => {
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

  it.each(BYTE_CASES)(
    "evaluates the length rule with %s",
    (_description, password, expected) => {
      expect(
        evaluatePasswordRules(password)[
          PASSWORD_RULE.LENGTH
        ]
      ).toBe(expected);
    }
  );
});
