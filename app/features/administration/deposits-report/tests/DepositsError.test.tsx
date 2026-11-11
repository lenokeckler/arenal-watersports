import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DepositsError from "../components/DepositsError";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import {
  HEADING_LEVEL_ONE,
  NO_ASSUME_PATTERN,
} from "./DepositsReport.constants";
import { createDepositsReportPage } from "./DepositsReport.page";

describe("DepositsError", () => {
  it("announces the failure with its title and the no-empty-list warning", () => {
    render(<DepositsError reset={vi.fn()} />);
    const alert = createDepositsReportPage().getAlert();

    expect(
      within(alert).getByText(
        DEPOSITS_REPORT_COPY.ERROR_TITLE
      )
    ).toBeInTheDocument();
    expect(
      within(alert).getByText(
        DEPOSITS_REPORT_COPY.ERROR_BODY
      )
    ).toBeInTheDocument();
    expect(alert).toHaveTextContent(NO_ASSUME_PATTERN);
  });

  it("renders no section, list or empty state in place of the lists", () => {
    render(<DepositsError reset={vi.fn()} />);
    const page = createDepositsReportPage();

    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(page.queryAnyList()).not.toBeInTheDocument();
    expect(
      page.queryText(DEPOSITS_REPORT_COPY.PENDING_HEADING)
    ).not.toBeInTheDocument();
    expect(
      page.queryText(DEPOSITS_REPORT_COPY.RETAINED_HEADING)
    ).not.toBeInTheDocument();
    expect(
      page.queryText(
        DEPOSITS_REPORT_COPY.PENDING_EMPTY_TITLE
      )
    ).not.toBeInTheDocument();
    expect(
      page.queryText(
        DEPOSITS_REPORT_COPY.RETAINED_EMPTY_TITLE
      )
    ).not.toBeInTheDocument();
  });

  it("retries the read when the worker taps the retry button", async () => {
    const reset = vi.fn();
    render(<DepositsError reset={reset} />);

    await userEvent
      .setup()
      .click(
        createDepositsReportPage().getButton(
          DEPOSITS_REPORT_COPY.RETRY
        )
      );

    expect(reset).toHaveBeenCalledOnce();
  });
});
