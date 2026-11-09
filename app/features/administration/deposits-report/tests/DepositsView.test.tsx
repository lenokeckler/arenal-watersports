import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import DepositsView from "../DepositsView";
import {
  CRC_HELD_DEPOSIT,
  CRC_PARTIAL_DEPOSIT,
  HEADING_LEVEL_TWO,
  USD_HELD_DEPOSIT,
  USD_RETAINED_DEPOSIT,
} from "./DepositsReport.constants";
import { createDepositsReportPage } from "./DepositsReport.page";

const PENDING_LIST =
  DEPOSITS_REPORT_COPY.PENDING_LIST_ARIA_LABEL;
const RETAINED_LIST =
  DEPOSITS_REPORT_COPY.RETAINED_LIST_ARIA_LABEL;

describe("DepositsView", () => {
  it("renders both sections with their headings", () => {
    render(
      <DepositsView
        pendingDeposits={[USD_HELD_DEPOSIT]}
        retainedDeposits={[USD_RETAINED_DEPOSIT]}
      />
    );
    const page = createDepositsReportPage();

    expect(
      page
        .getHeadings(HEADING_LEVEL_TWO)
        .map((heading) => heading.textContent)
    ).toEqual([
      DEPOSITS_REPORT_COPY.PENDING_HEADING,
      DEPOSITS_REPORT_COPY.RETAINED_HEADING,
    ]);
  });

  it("keeps the order of each list as received", () => {
    render(
      <DepositsView
        pendingDeposits={[
          CRC_HELD_DEPOSIT,
          USD_HELD_DEPOSIT,
        ]}
        retainedDeposits={[
          CRC_PARTIAL_DEPOSIT,
          USD_RETAINED_DEPOSIT,
        ]}
      />
    );
    const page = createDepositsReportPage();
    const [pendingFirst, pendingSecond] =
      page.getRows(PENDING_LIST);
    const [retainedFirst, retainedSecond] =
      page.getRows(RETAINED_LIST);

    expect(pendingFirst).toHaveTextContent(
      CRC_HELD_DEPOSIT.reservation.code
    );
    expect(pendingSecond).toHaveTextContent(
      USD_HELD_DEPOSIT.reservation.code
    );
    expect(retainedFirst).toHaveTextContent(
      CRC_PARTIAL_DEPOSIT.reservation.code
    );
    expect(retainedSecond).toHaveTextContent(
      USD_RETAINED_DEPOSIT.reservation.code
    );
  });

  it("shows the pending empty state while the retained list still renders", () => {
    render(
      <DepositsView
        pendingDeposits={[]}
        retainedDeposits={[USD_RETAINED_DEPOSIT]}
      />
    );
    const page = createDepositsReportPage();

    expect(
      page.getText(DEPOSITS_REPORT_COPY.PENDING_EMPTY_TITLE)
    ).toBeInTheDocument();
    expect(
      page.queryList(PENDING_LIST)
    ).not.toBeInTheDocument();
    expect(page.getRows(RETAINED_LIST)).toHaveLength(1);
    expect(
      page.queryText(
        DEPOSITS_REPORT_COPY.RETAINED_EMPTY_TITLE
      )
    ).not.toBeInTheDocument();
  });

  it("shows the retained empty state while the pending list still renders", () => {
    render(
      <DepositsView
        pendingDeposits={[USD_HELD_DEPOSIT]}
        retainedDeposits={[]}
      />
    );
    const page = createDepositsReportPage();

    expect(
      page.getText(
        DEPOSITS_REPORT_COPY.RETAINED_EMPTY_TITLE
      )
    ).toBeInTheDocument();
    expect(
      page.queryList(RETAINED_LIST)
    ).not.toBeInTheDocument();
    expect(page.getRows(PENDING_LIST)).toHaveLength(1);
    expect(
      page.queryText(
        DEPOSITS_REPORT_COPY.PENDING_EMPTY_TITLE
      )
    ).not.toBeInTheDocument();
  });

  it("shows both empty states and no list when nothing is held or retained", () => {
    render(
      <DepositsView
        pendingDeposits={[]}
        retainedDeposits={[]}
      />
    );
    const page = createDepositsReportPage();

    expect(
      page.getText(DEPOSITS_REPORT_COPY.PENDING_EMPTY_TITLE)
    ).toBeInTheDocument();
    expect(
      page.getText(
        DEPOSITS_REPORT_COPY.RETAINED_EMPTY_TITLE
      )
    ).toBeInTheDocument();
    expect(page.queryAnyList()).not.toBeInTheDocument();
  });
});
