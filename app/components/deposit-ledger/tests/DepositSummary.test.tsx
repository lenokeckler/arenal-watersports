import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import {
  CURRENCY_NAME_COPY,
  DEPOSIT_COPY,
} from "@/app/constants";
import DepositSummary from "../DepositSummary";
import {
  CRC_AMOUNT_TEXT,
  CRC_SUMMARY,
  LONG_CUSTOMER_NAME,
  USD_AMOUNT_TEXT,
  USD_SUMMARY,
} from "./DepositLedger.constants";
import { createDepositLedgerPage } from "./DepositLedger.page";

describe("DepositSummary", () => {
  it("shows a USD amount with the dollar currency name", () => {
    render(<DepositSummary {...USD_SUMMARY} />);
    const page = createDepositLedgerPage();

    expect(
      page.getText(USD_AMOUNT_TEXT)
    ).toBeInTheDocument();
    expect(
      page.getText(CURRENCY_NAME_COPY[USD_SUMMARY.currency])
    ).toBeInTheDocument();
    expect(
      page.queryText(
        CURRENCY_NAME_COPY[CRC_SUMMARY.currency]
      )
    ).not.toBeInTheDocument();
  });

  it("shows a CRC amount with the colon currency name", () => {
    render(<DepositSummary {...CRC_SUMMARY} />);
    const page = createDepositLedgerPage();

    expect(
      page.getText(CRC_AMOUNT_TEXT)
    ).toBeInTheDocument();
    expect(
      page.getText(CURRENCY_NAME_COPY[CRC_SUMMARY.currency])
    ).toBeInTheDocument();
    expect(
      page.queryText(
        CURRENCY_NAME_COPY[USD_SUMMARY.currency]
      )
    ).not.toBeInTheDocument();
  });

  it("shows the reservation label next to the code", () => {
    render(<DepositSummary {...USD_SUMMARY} />);
    const page = createDepositLedgerPage();

    expect(
      page.getTextContaining(
        DEPOSIT_COPY.RESERVATION_CODE_LABEL
      )
    ).toBeInTheDocument();
    expect(
      page.getText(USD_SUMMARY.code)
    ).toBeInTheDocument();
  });

  it("renders a long customer name in full", () => {
    render(
      <DepositSummary
        {...USD_SUMMARY}
        customerName={LONG_CUSTOMER_NAME}
      />
    );
    const page = createDepositLedgerPage();

    expect(
      page.getText(LONG_CUSTOMER_NAME)
    ).toBeInTheDocument();
  });
});
