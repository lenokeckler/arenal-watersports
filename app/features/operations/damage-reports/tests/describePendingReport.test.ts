import { describe, expect, it } from "vitest";
import { describePendingReport } from "../utils/describePendingReport";
import { PENDING_REPORT } from "./DamageReports.constants";

describe("describePendingReport", () => {
  it("names the machine and the day", () => {
    expect(describePendingReport(PENDING_REPORT)).toContain(
      PENDING_REPORT.unitCode
    );
  });
});
