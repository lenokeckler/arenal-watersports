import { describe, expect, it } from "vitest";
import { nextCount } from "../nextCount";

describe("nextCount", () => {
  it.each([
    [0, 1],
    [1, 2],
    [41, 42],
  ])("turns %i into %i", (count, expected) => {
    expect(nextCount(count)).toBe(expected);
  });
});
