import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import DepositEmptyNotice from "../DepositEmptyNotice";
import DepositErrorNotice from "../DepositErrorNotice";
import {
  EMPTY_NOTICE,
  ERROR_NOTICE,
} from "./DepositLedger.constants";
import { createDepositLedgerPage } from "./DepositLedger.page";

describe("DepositEmptyNotice", () => {
  it("shows the given icon, title and body", () => {
    render(<DepositEmptyNotice {...EMPTY_NOTICE} />);
    const page = createDepositLedgerPage();

    expect(
      page.getText(EMPTY_NOTICE.icon)
    ).toBeInTheDocument();
    expect(
      page.getText(EMPTY_NOTICE.title)
    ).toBeInTheDocument();
    expect(
      page.getText(EMPTY_NOTICE.body)
    ).toBeInTheDocument();
  });

  it("is not announced as an alert", () => {
    render(<DepositEmptyNotice {...EMPTY_NOTICE} />);
    const page = createDepositLedgerPage();

    expect(page.queryAlert()).not.toBeInTheDocument();
  });
});

describe("DepositErrorNotice", () => {
  it("announces its title and body as an alert", () => {
    render(<DepositErrorNotice {...ERROR_NOTICE} />);
    const page = createDepositLedgerPage();

    expect(page.getAlert()).toBeInTheDocument();
    expect(
      page.getTextInAlert(ERROR_NOTICE.title)
    ).toBeInTheDocument();
    expect(
      page.getTextInAlert(ERROR_NOTICE.body)
    ).toBeInTheDocument();
  });
});
