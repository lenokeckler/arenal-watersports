import { describe, expect, it } from "vitest";
import {
  TEXT_BOLD_CLASS,
  resolveTextClassName,
} from "../styles/Text.styles";
import {
  INLINE_TEXT_BOLD_CLASS,
  resolveInlineTextClassName,
} from "../styles/InlineText.styles";
import {
  CALLER_CLASS,
  EMPTY_CLASS,
} from "./Text.constants";

describe("resolveTextClassName", () => {
  it("returns only the caller classes when not bold", () => {
    expect(resolveTextClassName(false, CALLER_CLASS)).toBe(
      CALLER_CLASS
    );
  });

  it("puts the bold class before the caller classes", () => {
    expect(resolveTextClassName(true, CALLER_CLASS)).toBe(
      `${TEXT_BOLD_CLASS} ${CALLER_CLASS}`
    );
  });

  it("returns an empty string with no bold and no caller classes", () => {
    expect(resolveTextClassName(false, EMPTY_CLASS)).toBe(
      EMPTY_CLASS
    );
  });
});

describe("resolveInlineTextClassName", () => {
  it("returns only the caller classes when not bold", () => {
    expect(
      resolveInlineTextClassName(false, CALLER_CLASS)
    ).toBe(CALLER_CLASS);
  });

  it("puts the bold class before the caller classes", () => {
    expect(
      resolveInlineTextClassName(true, CALLER_CLASS)
    ).toBe(`${INLINE_TEXT_BOLD_CLASS} ${CALLER_CLASS}`);
  });

  it("returns an empty string with no bold and no caller classes", () => {
    expect(
      resolveInlineTextClassName(false, EMPTY_CLASS)
    ).toBe(EMPTY_CLASS);
  });
});
