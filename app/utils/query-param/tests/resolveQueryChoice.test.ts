import { describe, expect, it } from "vitest";
import { resolveQueryChoice } from "../resolveQueryChoice";
import {
  CHOICES,
  EMPTY_CHOICES,
  MEMBER_CASES,
  MEMBER_VALUE,
  NON_MEMBER_VALUES,
} from "./resolveQueryChoice.constants";

describe("resolveQueryChoice", () => {
  it.each(MEMBER_CASES)(
    "returns %s as the choice %s",
    (value, expected) => {
      expect(resolveQueryChoice(value, CHOICES)).toBe(
        expected
      );
    }
  );

  it.each(NON_MEMBER_VALUES)(
    "returns null for %j",
    (value) => {
      expect(resolveQueryChoice(value, CHOICES)).toBeNull();
    }
  );

  it("returns null when there are no choices", () => {
    expect(
      resolveQueryChoice(MEMBER_VALUE, EMPTY_CHOICES)
    ).toBeNull();
  });
});
