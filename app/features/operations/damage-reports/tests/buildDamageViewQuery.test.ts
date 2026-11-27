import { describe, expect, it } from "vitest";
import { buildDamageViewQuery } from "../utils/buildDamageViewQuery";
import { DAMAGE_FILTERS } from "./DamageReports.constants";

describe("buildDamageViewQuery", () => {
  it("keeps the calendar and chart parameters apart", () => {
    expect(
      buildDamageViewQuery(
        { ...DAMAGE_FILTERS, tab: "charts" },
        {}
      ).toString()
    ).toBe("tab=charts");
  });
});
