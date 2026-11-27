import { describe, expect, it } from "vitest";
import {
  DAMAGE_REPORT_OUTCOME,
  PATHS,
} from "@/app/constants";
import { buildSavedReportPath } from "../utils/buildSavedReportPath";

describe("buildSavedReportPath", () => {
  it("says whether the detail was left for later", () => {
    expect(buildSavedReportPath(true)).toBe(
      PATHS.OPERATIONS.DAMAGE_REPORTS_SAVED(
        DAMAGE_REPORT_OUTCOME.LATER
      )
    );
    expect(buildSavedReportPath(false)).toBe(
      PATHS.OPERATIONS.DAMAGE_REPORTS_SAVED(
        DAMAGE_REPORT_OUTCOME.COMPLETE
      )
    );
  });
});
