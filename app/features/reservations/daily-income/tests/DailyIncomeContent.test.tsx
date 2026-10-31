import { describe, expect, it } from "vitest";
import { render, within } from "@testing-library/react";
import {
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
} from "@/app/constants";
import DailyIncomeContent from "../components/DailyIncomeContent";
import {
  DAILY_INCOME_COPY,
  DAILY_INCOME_NO_MOVEMENT_COPY,
} from "../constants/DailyIncomeCopy.constants";
import {
  COLON_TOTAL_TEXT,
  DATE_TIME_ATTRIBUTE,
  DAY_WITH_BOTH_CURRENCIES,
  DAY_WITH_ONLY_COLONES,
  DAY_WITHOUT_INCOME,
  DOLLAR_TOTAL_TEXT,
  HEADING_LEVEL_ONE,
  HEADING_LEVEL_TWO,
  INCOME_DATE,
  INCOME_DATE_TEXT,
} from "./DailyIncome.constants";
import { createDailyIncomePage } from "./DailyIncome.page";

const DOLLAR_NAME = CURRENCY_NAME_COPY[CURRENCY_CODE.USD];
const COLON_NAME = CURRENCY_NAME_COPY[CURRENCY_CODE.CRC];

describe("DailyIncomeContent", () => {
  it("titles the page and shows the Costa Rica date as a time element", () => {
    render(
      <DailyIncomeContent
        income={DAY_WITH_BOTH_CURRENCIES}
      />
    );
    const page = createDailyIncomePage();
    const date = page.getText(INCOME_DATE_TEXT);

    expect(
      page.getHeadings(HEADING_LEVEL_ONE)
    ).toHaveLength(1);
    expect(date.getAttribute(DATE_TIME_ATTRIBUTE)).toBe(
      INCOME_DATE
    );
  });

  it("shows dollars first and colones second, each with only its own total", () => {
    render(
      <DailyIncomeContent
        income={DAY_WITH_BOTH_CURRENCIES}
      />
    );
    const page = createDailyIncomePage();

    expect(
      page
        .getHeadings(HEADING_LEVEL_TWO)
        .map((heading) => heading.textContent)
    ).toEqual([DOLLAR_NAME, COLON_NAME]);
    expect(
      page.getLeafByExactText(
        page.getRegion(DOLLAR_NAME),
        DOLLAR_TOTAL_TEXT
      )
    ).toBeInTheDocument();
    expect(
      page.getLeafByExactText(
        page.getRegion(COLON_NAME),
        COLON_TOTAL_TEXT
      )
    ).toBeInTheDocument();
  });

  it("keeps the dollar card saying no payments came in when only colones did", () => {
    render(
      <DailyIncomeContent income={DAY_WITH_ONLY_COLONES} />
    );
    const page = createDailyIncomePage();

    expect(page.queryRegions()).toHaveLength(2);
    expect(
      within(page.getRegion(DOLLAR_NAME)).getByText(
        DAILY_INCOME_NO_MOVEMENT_COPY[CURRENCY_CODE.USD]
      )
    ).toBeInTheDocument();
    expect(
      page.queryText(DAILY_INCOME_COPY.EMPTY_TITLE)
    ).toBeNull();
  });

  it("shows a single empty block and no cards when the day has no income", () => {
    render(
      <DailyIncomeContent income={DAY_WITHOUT_INCOME} />
    );
    const page = createDailyIncomePage();

    expect(
      page.getText(DAILY_INCOME_COPY.EMPTY_TITLE)
    ).toBeInTheDocument();
    expect(
      page.getText(DAILY_INCOME_COPY.EMPTY_BODY)
    ).toBeInTheDocument();
    expect(page.queryRegions()).toHaveLength(0);
  });
});
