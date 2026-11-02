import { describe, expect, it } from "vitest";
import { canonicalizePathname } from "../canonicalizePathname";
import { CANONICAL_CASES } from "./canonicalizePathname.constants";

describe("canonicalizePathname", () => {
  it.each(CANONICAL_CASES)(
    "turns %s into %s",
    (pathname, expected) => {
      expect(canonicalizePathname(pathname)).toBe(expected);
    }
  );
});
