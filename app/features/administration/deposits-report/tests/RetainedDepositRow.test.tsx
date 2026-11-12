import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CURRENCY_NAME_COPY } from "@/app/constants";
import type { RetainedDepositItem } from "@/app/services/deposits";
import RetainedDepositRow from "../components/RetainedDepositRow";
import { DEPOSITS_REPORT_COPY } from "../constants/DepositsReportCopy.constants";
import {
  CRC_ORIGINAL_AMOUNT_TEXT,
  CRC_PARTIAL_DEPOSIT,
  CRC_RETAINED_AMOUNT_TEXT,
  MULTILINE_REASON,
  USD_RETAINED_AMOUNT_TEXT,
  USD_RETAINED_DEPOSIT,
} from "./DepositsReport.constants";
import { createDepositsReportPage } from "./DepositsReport.page";

const renderRow = (deposit: RetainedDepositItem) => {
  const { container } = render(
    <RetainedDepositRow deposit={deposit} />
  );
  return {
    page: createDepositsReportPage(),
    row: container,
  };
};

describe("RetainedDepositRow", () => {
  it("shows customer, code, retained amount, currency name and reason", () => {
    const { page, row } = renderRow(USD_RETAINED_DEPOSIT);

    expect(
      page.getInRow(
        row,
        USD_RETAINED_DEPOSIT.reservation.customerName
      )
    ).toBeInTheDocument();
    expect(
      page.getInRow(
        row,
        USD_RETAINED_DEPOSIT.reservation.code
      )
    ).toBeInTheDocument();
    expect(
      page.getLeafByExactText(row, USD_RETAINED_AMOUNT_TEXT)
    ).toBeInTheDocument();
    expect(
      page.getInRow(
        row,
        CURRENCY_NAME_COPY[USD_RETAINED_DEPOSIT.currency]
      )
    ).toBeInTheDocument();
    expect(
      page.getInRow(
        row,
        DEPOSITS_REPORT_COPY.RETENTION_REASON_LABEL
      )
    ).toBeInTheDocument();
    expect(
      page.getInRow(
        row,
        USD_RETAINED_DEPOSIT.retentionReason
      )
    ).toBeInTheDocument();
  });

  it("shows the retained amount of a partial retention, never an original amount", () => {
    const { page, row } = renderRow(CRC_PARTIAL_DEPOSIT);

    expect(
      page.getLeafByExactText(row, CRC_RETAINED_AMOUNT_TEXT)
    ).toBeInTheDocument();
    expect(row).not.toHaveTextContent(
      CRC_ORIGINAL_AMOUNT_TEXT
    );
  });

  it("shows the fallback when the reason is blank", () => {
    const { page, row } = renderRow({
      ...USD_RETAINED_DEPOSIT,
      retentionReason: "  ",
    });

    expect(
      page.getInRow(row, DEPOSITS_REPORT_COPY.NO_REASON)
    ).toBeInTheDocument();
  });

  it("shows a multi-line reason with its line break intact", () => {
    const { page, row } = renderRow({
      ...USD_RETAINED_DEPOSIT,
      retentionReason: MULTILINE_REASON,
    });

    expect(
      page.getByRawText(row, MULTILINE_REASON)
    ).toBeInTheDocument();
    expect(
      page.queryInRow(row, DEPOSITS_REPORT_COPY.NO_REASON)
    ).not.toBeInTheDocument();
  });
});
