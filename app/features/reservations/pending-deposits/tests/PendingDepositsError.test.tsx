import { describe, expect, it } from "vitest";
import { render, within } from "@testing-library/react";
import PendingDepositsError from "../components/PendingDepositsError";
import { PENDING_DEPOSITS_COPY } from "../constants/PendingDepositsCopy.constants";
import { HEADING_LEVEL_ONE } from "./PendingDeposits.constants";
import { createPendingDepositsPage } from "./PendingDeposits.page";

describe("PendingDepositsError", () => {
  it("announces the failure with its title and body", () => {
    render(<PendingDepositsError />);
    const page = createPendingDepositsPage();

    expect(
      within(page.getAlert()).getByText(
        PENDING_DEPOSITS_COPY.ERROR_TITLE
      )
    ).toBeInTheDocument();
    expect(
      within(page.getAlert()).getByText(
        PENDING_DEPOSITS_COPY.ERROR_BODY
      )
    ).toBeInTheDocument();
  });

  it("keeps one level-one heading and renders no list", () => {
    render(<PendingDepositsError />);
    const page = createPendingDepositsPage();

    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(page.queryList()).not.toBeInTheDocument();
  });

  it("never shows the empty state copy", () => {
    render(<PendingDepositsError />);
    const page = createPendingDepositsPage();

    expect(
      page.queryText(PENDING_DEPOSITS_COPY.EMPTY_TITLE)
    ).not.toBeInTheDocument();
  });
});
