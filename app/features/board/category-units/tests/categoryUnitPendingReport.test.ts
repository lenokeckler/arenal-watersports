import { describe, expect, it } from "vitest";
import { buildUnitStatusDetails } from "../utils/buildUnitStatusDetails";
import { DAMAGE_ROW } from "./CategoryUnitDamageRow.constants";

describe("buildUnitStatusDetails pending report", () => {
  it("keeps the report that still needs its detail", () => {
    const details = buildUnitStatusDetails(
      "unit-1",
      [],
      [
        DAMAGE_ROW,
        {
          ...DAMAGE_ROW,
          detail_pending: true,
          id: "damage-2",
        },
      ]
    );

    expect(details.pendingReportId).toBe("damage-2");
  });
});
