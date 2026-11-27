import { describe, expect, it } from "vitest";
import { UNIT_HISTORY_COPY } from "../constants/UnitHistoryCopy.constants";
import { describeJobCost } from "../utils/describeJobCost";
import { HISTORY_DATA } from "./UnitHistory.constants";

describe("describeJobCost", () => {
  it("says there is no cost and marks outside work", () => {
    const text = describeJobCost({
      ...HISTORY_DATA.jobs[0],
      costAmount: null,
      currency: null,
      isExternal: true,
    });

    expect(text).toContain(UNIT_HISTORY_COPY.NO_COST);
    expect(text).toContain(UNIT_HISTORY_COPY.EXTERNAL);
  });
});
