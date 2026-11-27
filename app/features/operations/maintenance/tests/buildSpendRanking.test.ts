import { describe, expect, it } from "vitest";
import { buildSpendRanking } from "../utils/buildSpendRanking";
import { MAINTENANCE_JOBS } from "./MaintenanceData.constants";

describe("buildSpendRanking", () => {
  it("ranks only the jobs paid in the chosen currency", () => {
    const rows = buildSpendRanking(MAINTENANCE_JOBS, "USD");
    const paidInDollars = new Set(
      MAINTENANCE_JOBS.filter(
        (job) => job.currency === "USD"
      ).map((job) => job.unitId)
    );

    expect(rows.length).toBe(paidInDollars.size);
    rows.forEach((row) => {
      expect(paidInDollars.has(row.key)).toBe(true);
      expect(row.valueText).toContain("US$");
    });
  });
});
