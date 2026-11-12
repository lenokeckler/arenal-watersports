import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DepositsLoading from "../components/DepositsLoading";
import { DEPOSITS_REPORT_SKELETON_ROW_COUNT } from "../constants/DepositsReport.constants";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import {
  ARIA_BUSY_ATTRIBUTE,
  ARIA_BUSY_VALUE,
  SKELETON_TEXT_PATTERN,
} from "./DepositsReport.constants";
import { createDepositsReportPage } from "./DepositsReport.page";

describe("DepositsLoading", () => {
  it("announces the loading state through a status region", () => {
    render(<DepositsLoading />);
    const page = createDepositsReportPage();
    const busyRegion = page.getBusyRegion(
      DEPOSITS_REPORT_COPY.PENDING_LIST_ARIA_LABEL
    );

    expect(page.getStatus()).toHaveTextContent(
      DEPOSITS_REPORT_COPY.LOADING_ANNOUNCEMENT
    );
    expect(busyRegion).toHaveAttribute(
      ARIA_BUSY_ATTRIBUTE,
      ARIA_BUSY_VALUE
    );
    expect(busyRegion).not.toContainElement(
      page.getStatus()
    );
  });

  it("renders skeleton rows for both sections and no deposit text", () => {
    render(<DepositsLoading />);
    const page = createDepositsReportPage();

    expect(page.getAllRows()).toHaveLength(
      DEPOSITS_REPORT_SKELETON_ROW_COUNT * 2
    );
    expect(
      page.queryTextMatching(SKELETON_TEXT_PATTERN)
    ).not.toBeInTheDocument();
  });
});
