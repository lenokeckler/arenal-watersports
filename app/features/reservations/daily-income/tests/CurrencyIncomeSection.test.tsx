import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { render, within } from "@testing-library/react";
import {
  ARIA_ROLE,
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
} from "@/app/constants";
import CurrencyIncomeSection from "../components/CurrencyIncomeSection";
import {
  DAILY_INCOME_COPY,
  DAILY_INCOME_METHOD_LIST_COPY,
  DAILY_INCOME_NO_MOVEMENT_COPY,
} from "../constants/DailyIncomeCopy.constants";
import {
  COLON_INCOME,
  DOLLAR_BLANK_METHOD_TEXT,
  DOLLAR_CARD_TEXT,
  DOLLAR_INCOME,
  DOLLAR_TOTAL_TEXT,
  EXPECTED_DOLLAR_BAR_WIDTHS,
  HEADING_LEVEL_THREE,
  ID_ATTRIBUTE,
  NO_DOLLAR_INCOME,
  NUMBERED_AND_BLANK_METHODS,
  ZERO_DOLLAR_TEXT,
} from "./DailyIncome.constants";
import { createDailyIncomePage } from "./DailyIncome.page";

const DOLLAR_NAME = CURRENCY_NAME_COPY[CURRENCY_CODE.USD];
const DOLLAR_LIST_NAME =
  DAILY_INCOME_METHOD_LIST_COPY[CURRENCY_CODE.USD];

describe("CurrencyIncomeSection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("names the currency region and shows its code and own total", () => {
    render(
      <CurrencyIncomeSection income={DOLLAR_INCOME} />
    );
    const page = createDailyIncomePage();
    const region = page.getRegion(DOLLAR_NAME);

    expect(
      within(region).getByText(CURRENCY_CODE.USD)
    ).toBeInTheDocument();
    expect(
      within(region).getByText(
        DAILY_INCOME_COPY.INCOME_LABEL
      )
    ).toBeInTheDocument();
    expect(
      page.getLeafByExactText(region, DOLLAR_TOTAL_TEXT)
    ).toBeInTheDocument();
  });

  it("lists one row per payment method, largest first, with its amount", () => {
    render(
      <CurrencyIncomeSection income={DOLLAR_INCOME} />
    );
    const page = createDailyIncomePage();
    const [cardRow, blankRow] = page.getRows(
      DOLLAR_LIST_NAME
    );

    expect(page.getRows(DOLLAR_LIST_NAME)).toHaveLength(2);
    expect(
      within(cardRow).getByText(
        DOLLAR_INCOME.byPaymentMethod[0].name
      )
    ).toBeInTheDocument();
    expect(
      page.getLeafByExactText(cardRow, DOLLAR_CARD_TEXT)
    ).toBeInTheDocument();
    expect(
      within(blankRow).getByText(
        DAILY_INCOME_COPY.NO_PAYMENT_METHOD
      )
    ).toBeInTheDocument();
    expect(
      page.getLeafByExactText(
        blankRow,
        DOLLAR_BLANK_METHOD_TEXT
      )
    ).toBeInTheDocument();
  });

  it("draws each bar relative to the largest method of the same currency", () => {
    render(
      <CurrencyIncomeSection income={DOLLAR_INCOME} />
    );
    const page = createDailyIncomePage();

    expect(page.getBarWidths(DOLLAR_LIST_NAME)).toEqual(
      EXPECTED_DOLLAR_BAR_WIDTHS
    );
  });

  it("titles the breakdown under the currency heading", () => {
    render(
      <CurrencyIncomeSection income={DOLLAR_INCOME} />
    );
    const region =
      createDailyIncomePage().getRegion(DOLLAR_NAME);

    expect(
      within(region).getByRole(ARIA_ROLE.HEADING, {
        level: HEADING_LEVEL_THREE,
        name: DAILY_INCOME_COPY.BREAKDOWN_TITLE,
      })
    ).toBeInTheDocument();
  });

  it("says no payments came in instead of showing a zero total", () => {
    render(
      <CurrencyIncomeSection income={NO_DOLLAR_INCOME} />
    );
    const page = createDailyIncomePage();
    const region = page.getRegion(DOLLAR_NAME);

    expect(
      within(region).getByText(
        DAILY_INCOME_NO_MOVEMENT_COPY[CURRENCY_CODE.USD]
      )
    ).toBeInTheDocument();
    expect(page.queryText(ZERO_DOLLAR_TEXT)).toBeNull();
    expect(page.queryList()).toBeNull();
  });

  it("keeps element ids unique when both currency cards are on screen", () => {
    const { container } = render(
      <>
        <CurrencyIncomeSection income={DOLLAR_INCOME} />
        <CurrencyIncomeSection income={COLON_INCOME} />
      </>
    );
    const ids = Array.from(
      container.querySelectorAll(`[${ID_ATTRIBUTE}]`)
    ).map((element) => element.getAttribute(ID_ATTRIBUTE));

    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives a blank method row its own key next to a method named like its position", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    render(
      <CurrencyIncomeSection
        income={NUMBERED_AND_BLANK_METHODS}
      />
    );

    expect(consoleError).not.toHaveBeenCalled();
  });
});
