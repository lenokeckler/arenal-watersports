import { describe, expect, it } from "vitest";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import { formatSpend } from "../utils/formatSpend";
import { groupJobsByMonth } from "../utils/groupJobsByMonth";
import { HISTORY_DATA } from "./UnitHistory.constants";

describe("unit history rules", () => {
  it("groups the jobs by month keeping their order", () => {
    expect(
      groupJobsByMonth(HISTORY_DATA.jobs).map((group) => [
        group.month,
        group.jobs.length,
      ])
    ).toEqual([
      ["2026-11", 2],
      ["2026-10", 1],
    ]);
  });

  it("shows the spend per currency, or says there is none", () => {
    expect(formatSpend(HISTORY_DATA.jobs)).toContain(" + ");
    expect(formatSpend([])).toBe(
      UNIT_HISTORY_COPY.NO_SPEND
    );
  });
});
