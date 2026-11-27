import { describe, expect, it } from "vitest";
import { findEarliestDate } from "../utils/findEarliestDate";

describe("findEarliestDate", () => {
  it("ignores missing dates and keeps the oldest", () => {
    expect(
      findEarliestDate(["2026-02-01", null, "2025-12-30"])
    ).toBe("2025-12-30");
    expect(findEarliestDate([null, null])).toBeNull();
  });
});
