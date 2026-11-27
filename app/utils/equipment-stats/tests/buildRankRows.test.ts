import { describe, expect, it } from "vitest";
import { EQUIPMENT_RETIRED, PATHS } from "@/app/constants";
import { buildRankRows } from "../buildRankRows";

const UNITS = [
  { total: 2, unitCode: "JET-01", unitId: "unit-1" },
  { total: 1, unitCode: "JET-99", unitId: "unit-99" },
];

describe("buildRankRows", () => {
  it("links a working machine and not a retired one", () => {
    const [working, retired] = buildRankRows({
      formatValue: (total) => `${total}`,
      retiredIds: new Set(["unit-99"]),
      units: UNITS,
    });

    expect(working).toMatchObject({
      href: PATHS.OPERATIONS.UNIT_HISTORY("unit-1"),
      label: "JET-01",
      valueText: "2",
    });
    expect(retired.href).toBeNull();
    expect(retired.label).toBe(
      EQUIPMENT_RETIRED.LABELLED("JET-99")
    );
  });
});
