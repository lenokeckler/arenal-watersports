import { describe, expect, it } from "vitest";
import { buildDamageReportUnits } from "../utils/buildDamageReportUnits";
import { REPORT_UNIT_ID } from "./DamageReport.constants";
import {
  REPORT_TRIP_ROWS,
  REPORT_UNIT_ROWS,
} from "./DamageReportRows.constants";

describe("buildDamageReportUnits", () => {
  it("offers each machine only its own trips, newest first", () => {
    const [unit] = buildDamageReportUnits(
      REPORT_UNIT_ROWS,
      REPORT_TRIP_ROWS,
      [{ unit_id: REPORT_UNIT_ID }],
      (_, customer) => customer
    );

    expect(unit.isOut).toBe(true);
    expect(unit.trips.map((trip) => trip.label)).toEqual([
      "Después",
      "Antes",
    ]);
  });
});
