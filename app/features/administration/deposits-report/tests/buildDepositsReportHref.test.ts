import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { buildDepositsReportHref } from "../utils/buildDepositsReportHref";
import { MIDDLE_PAGES_HREF } from "./DepositsReport.constants";

describe("buildDepositsReportHref", () => {
  it("returns the bare report path when both lists are on their first page", () => {
    expect(
      buildDepositsReportHref({ pending: 1, retained: 1 })
    ).toBe(PATHS.ADMINISTRATION.DEPOSITS);
  });

  it("names only the list that left its first page", () => {
    expect(
      buildDepositsReportHref({ pending: 1, retained: 3 })
    ).toBe(MIDDLE_PAGES_HREF.PENDING_PREVIOUS);
  });

  it("names both pages when both lists left their first page", () => {
    expect(
      buildDepositsReportHref({ pending: 3, retained: 3 })
    ).toBe(MIDDLE_PAGES_HREF.PENDING_NEXT);
  });
});
