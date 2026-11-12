import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { hasCharacterInRange } from "../hasCharacterInRange";
import {
  CHARACTER_ABOVE_CUSTOM_RANGE,
  CHARACTER_BELOW_CUSTOM_RANGE,
  CHARACTER_INSIDE_CUSTOM_RANGE,
  CUSTOM_RANGE,
} from "./password.constants";

describe("hasCharacterInRange", () => {
  it("finds a character inside the range", () => {
    expect(
      hasCharacterInRange(
        CHARACTER_INSIDE_CUSTOM_RANGE,
        CUSTOM_RANGE
      )
    ).toBe(true);
  });

  it("includes both ends of the range", () => {
    expect(
      hasCharacterInRange(CUSTOM_RANGE.FIRST, CUSTOM_RANGE)
    ).toBe(true);
    expect(
      hasCharacterInRange(CUSTOM_RANGE.LAST, CUSTOM_RANGE)
    ).toBe(true);
  });

  it("rejects characters just outside the range", () => {
    expect(
      hasCharacterInRange(
        CHARACTER_BELOW_CUSTOM_RANGE +
          CHARACTER_ABOVE_CUSTOM_RANGE,
        CUSTOM_RANGE
      )
    ).toBe(false);
  });

  it("finds a match anywhere in the text", () => {
    expect(
      hasCharacterInRange(
        CHARACTER_BELOW_CUSTOM_RANGE +
          CHARACTER_INSIDE_CUSTOM_RANGE,
        CUSTOM_RANGE
      )
    ).toBe(true);
  });

  it("rejects an empty text", () => {
    expect(
      hasCharacterInRange(STRING.Empty, CUSTOM_RANGE)
    ).toBe(false);
  });
});
