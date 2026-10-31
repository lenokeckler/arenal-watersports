import { describe, expect, it } from "vitest";
import { render, within } from "@testing-library/react";
import DailyIncomeError from "../components/DailyIncomeError";
import { DAILY_INCOME_COPY } from "../constants/DailyIncomeCopy.constants";
import { HEADING_LEVEL_ONE } from "./DailyIncome.constants";
import { createDailyIncomePage } from "./DailyIncome.page";

describe("DailyIncomeError", () => {
  it("announces the failure with its title and body", () => {
    render(<DailyIncomeError />);
    const alert = createDailyIncomePage().getAlert();

    expect(
      within(alert).getByText(DAILY_INCOME_COPY.ERROR_TITLE)
    ).toBeInTheDocument();
    expect(
      within(alert).getByText(DAILY_INCOME_COPY.ERROR_BODY)
    ).toBeInTheDocument();
  });

  it("keeps the page title and renders no currency card", () => {
    render(<DailyIncomeError />);
    const page = createDailyIncomePage();

    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(page.queryRegions()).toHaveLength(0);
  });

  it("never reads as a day without income", () => {
    render(<DailyIncomeError />);
    const page = createDailyIncomePage();

    expect(
      page.queryText(DAILY_INCOME_COPY.EMPTY_TITLE)
    ).toBeNull();
  });
});
