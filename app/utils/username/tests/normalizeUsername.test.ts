import { describe, expect, it } from "vitest";
import { normalizeUsername } from "../normalizeUsername";
import {
  BLANK_USERNAME,
  CANONICAL_USERNAME,
  EMPTY_USERNAME,
  USERNAME_WITH_INNER_SPACE,
  USERNAME_WITH_SURROUNDING_SPACES,
  USERNAME_WITH_UPPERCASE,
} from "./normalizeUsername.constants";

describe("normalizeUsername", () => {
  it("lowercases the username", () => {
    expect(normalizeUsername(USERNAME_WITH_UPPERCASE)).toBe(
      CANONICAL_USERNAME
    );
  });

  it("trims surrounding whitespace", () => {
    expect(
      normalizeUsername(USERNAME_WITH_SURROUNDING_SPACES)
    ).toBe(CANONICAL_USERNAME);
  });

  it("keeps inner whitespace", () => {
    expect(
      normalizeUsername(USERNAME_WITH_INNER_SPACE)
    ).toBe(USERNAME_WITH_INNER_SPACE);
  });

  it("returns an empty string for empty or blank input", () => {
    expect(normalizeUsername(EMPTY_USERNAME)).toBe(
      EMPTY_USERNAME
    );
    expect(normalizeUsername(BLANK_USERNAME)).toBe(
      EMPTY_USERNAME
    );
  });
});
