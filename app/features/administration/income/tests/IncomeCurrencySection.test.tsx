import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import {
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
} from "@/app/constants";
import IncomeCurrencySection from "../components/IncomeCurrencySection";
import {
  INCOME_COPY,
  INCOME_NO_MOVEMENT_COPY,
} from "../constants/IncomeCopy.constants";
import {
  BALANCED_DOLLAR_DISPLAY,
  CHARGE_ONLY_DOLLAR_DISPLAY,
  DOLLAR_COLLECTED_TEXT,
  DOLLAR_DISPLAY,
  DOLLAR_NET_TEXT,
  DOLLAR_REFUNDED_TEXT,
  ERROR_TEXT_CLASS,
  HEADING_LEVEL_TWO,
  IDLE_COLON_DISPLAY,
  NEGATIVE_COLON_DISPLAY,
  NEGATIVE_COLON_NET_TEXT,
  ZERO_DOLLAR_TEXT,
} from "./Income.constants";
import { createIncomePage } from "./Income.page";

describe("IncomeCurrencySection", () => {
  it("names the card after its currency and shows its code", () => {
    render(
      <IncomeCurrencySection display={DOLLAR_DISPLAY} />
    );
    const page = createIncomePage();
    const region = page.getRegion(
      CURRENCY_NAME_COPY[CURRENCY_CODE.USD]
    );

    expect(
      page.getHeadings(HEADING_LEVEL_TWO)
    ).toHaveLength(1);
    expect(
      page.getWithin(region).getByText(CURRENCY_CODE.USD)
    ).toBeInTheDocument();
  });

  it("reads charged, refunded and net in that order, with the refund marked as subtracted", () => {
    render(
      <IncomeCurrencySection display={DOLLAR_DISPLAY} />
    );
    const page = createIncomePage();

    expect(page.getTerms()).toEqual([
      INCOME_COPY.COLLECTED_LABEL,
      INCOME_COPY.REFUNDED_LABEL,
      INCOME_COPY.NET_LABEL,
    ]);
    expect(
      page.getFigureText(INCOME_COPY.COLLECTED_LABEL)
    ).toBe(DOLLAR_COLLECTED_TEXT);
    expect(
      page.getFigureText(INCOME_COPY.REFUNDED_LABEL)
    ).toBe(DOLLAR_REFUNDED_TEXT);
    expect(page.getFigureText(INCOME_COPY.NET_LABEL)).toBe(
      DOLLAR_NET_TEXT
    );
    expect(page.getHiddenSigns()).toHaveLength(1);
    expect(
      page.getText(INCOME_COPY.NET_HELP)
    ).toBeInTheDocument();
  });

  it("marks a negative net with a sign, a spoken minus, the error colour and a note", () => {
    render(
      <IncomeCurrencySection
        display={NEGATIVE_COLON_DISPLAY}
      />
    );
    const page = createIncomePage();
    const net = page.getFigure(INCOME_COPY.NET_LABEL);

    expect(net?.textContent).toBe(NEGATIVE_COLON_NET_TEXT);
    expect(net).toHaveClass(ERROR_TEXT_CLASS);
    expect(
      page.getText(INCOME_COPY.NET_NEGATIVE_NOTE)
    ).toBeInTheDocument();
  });

  it("shows a zero net without sign or note when refunds cancel the charges", () => {
    render(
      <IncomeCurrencySection
        display={BALANCED_DOLLAR_DISPLAY}
      />
    );
    const page = createIncomePage();
    const net = page.getFigure(INCOME_COPY.NET_LABEL);

    expect(net?.textContent).toBe(ZERO_DOLLAR_TEXT);
    expect(net).not.toHaveClass(ERROR_TEXT_CLASS);
    expect(
      page.queryText(INCOME_COPY.NET_NEGATIVE_NOTE)
    ).toBeNull();
  });

  it("shows a refund of zero without a minus sign", () => {
    render(
      <IncomeCurrencySection
        display={CHARGE_ONLY_DOLLAR_DISPLAY}
      />
    );
    const page = createIncomePage();

    expect(
      page.getFigureText(INCOME_COPY.REFUNDED_LABEL)
    ).toBe(ZERO_DOLLAR_TEXT);
    expect(page.getHiddenSigns()).toHaveLength(0);
  });

  it("says a currency had no movement instead of showing zero figures", () => {
    render(
      <IncomeCurrencySection display={IDLE_COLON_DISPLAY} />
    );
    const page = createIncomePage();

    expect(
      page.getText(
        INCOME_NO_MOVEMENT_COPY[CURRENCY_CODE.CRC]
      )
    ).toBeInTheDocument();
    expect(page.queryDefinitions()).toHaveLength(0);
  });
});
