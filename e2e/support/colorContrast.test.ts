import { calculateContrastRatio } from "./colorContrast";
import { describe, expect, it } from "vitest";

const TEST_BLACK_HEX = "#000000";
const TEST_WHITE_HEX = "#ffffff";
const TEST_MID_GRAY_HEX = "#767676";
const MAXIMUM_CONTRAST_RATIO = 21;

describe("calculateContrastRatio", () => {
  it("returns the maximum ratio for black and white", () => {
    expect(
      calculateContrastRatio(TEST_BLACK_HEX, TEST_WHITE_HEX)
    ).toBe(MAXIMUM_CONTRAST_RATIO);
  });

  it("returns the same ratio when foreground and background are swapped", () => {
    expect(
      calculateContrastRatio(
        TEST_WHITE_HEX,
        TEST_MID_GRAY_HEX
      )
    ).toBeCloseTo(
      calculateContrastRatio(
        TEST_MID_GRAY_HEX,
        TEST_WHITE_HEX
      )
    );
  });

  it("rejects colors outside the six-digit hexadecimal format", () => {
    expect(() =>
      calculateContrastRatio("#0G0000", TEST_BLACK_HEX)
    ).toThrow();
  });
});
