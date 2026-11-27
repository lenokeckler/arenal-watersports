import { describe, expect, it } from "vitest";
import { resolveMonthLinks } from "../resolveMonthLinks";

const toHref = (month: string): string => month;

describe("resolveMonthLinks", () => {
  it("links only to the months that exist", () => {
    expect(
      resolveMonthLinks({
        month: "2026-11",
        months: ["2026-10", "2026-11"],
        toHref,
      })
    ).toEqual({ nextHref: null, previousHref: "2026-10" });
  });
});
