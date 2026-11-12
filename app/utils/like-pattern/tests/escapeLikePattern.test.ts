import { describe, expect, it } from "vitest";
import { escapeLikePattern } from "../escapeLikePattern";
import {
  ESCAPED_GROUP_NAME_WITH_BACKSLASH,
  ESCAPED_GROUP_NAME_WITH_PERCENT,
  ESCAPED_GROUP_NAME_WITH_UNDERSCORE,
  GROUP_NAME_WITH_BACKSLASH,
  GROUP_NAME_WITH_PERCENT,
  GROUP_NAME_WITH_UNDERSCORE,
  GROUP_NAME_WITHOUT_WILDCARDS,
} from "./escapeLikePattern.constants";

describe("escapeLikePattern", () => {
  it("returns a value without wildcards unchanged", () => {
    expect(
      escapeLikePattern(GROUP_NAME_WITHOUT_WILDCARDS)
    ).toBe(GROUP_NAME_WITHOUT_WILDCARDS);
  });

  it("escapes a literal percent sign", () => {
    expect(escapeLikePattern(GROUP_NAME_WITH_PERCENT)).toBe(
      ESCAPED_GROUP_NAME_WITH_PERCENT
    );
  });

  it("escapes a literal underscore", () => {
    expect(
      escapeLikePattern(GROUP_NAME_WITH_UNDERSCORE)
    ).toBe(ESCAPED_GROUP_NAME_WITH_UNDERSCORE);
  });

  it("escapes a literal backslash before escaping wildcards", () => {
    expect(
      escapeLikePattern(GROUP_NAME_WITH_BACKSLASH)
    ).toBe(ESCAPED_GROUP_NAME_WITH_BACKSLASH);
  });
});
