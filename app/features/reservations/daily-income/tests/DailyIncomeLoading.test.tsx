import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import DailyIncomeLoading from "../components/DailyIncomeLoading";
import { DAILY_INCOME_COPY } from "../constants/DailyIncomeCopy.constants";
import {
  ARIA_BUSY_ATTRIBUTE,
  ARIA_BUSY_TRUE,
  HEADING_LEVEL_ONE,
} from "./DailyIncome.constants";
import { createDailyIncomePage } from "./DailyIncome.page";

describe("DailyIncomeLoading", () => {
  it("marks the page busy and announces the load to screen readers", () => {
    render(<DailyIncomeLoading />);
    const page = createDailyIncomePage();

    expect(
      page.getMain().getAttribute(ARIA_BUSY_ATTRIBUTE)
    ).toBe(ARIA_BUSY_TRUE);
    expect(page.getStatus()).toHaveTextContent(
      DAILY_INCOME_COPY.LOADING_ANNOUNCEMENT
    );
  });

  it("keeps the page title and shows no figures while loading", () => {
    render(<DailyIncomeLoading />);
    const page = createDailyIncomePage();

    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(page.queryRegions()).toHaveLength(0);
    expect(page.queryList()).toBeNull();
  });
});
