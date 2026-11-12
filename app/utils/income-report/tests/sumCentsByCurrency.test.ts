import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { sumCentsByCurrency } from "../sumCentsByCurrency";
import {
  CENTS_CRC_CHARGED,
  CENTS_THIRTY,
  CENTS_USD_CHARGED,
  CRC_CHARGE,
  NO_CENTS,
  USD_CHARGE_ONE,
  USD_CHARGE_TWO,
  USD_TEN_CENTS,
  USD_TWENTY_CENTS,
} from "./IncomeReportSummary.constants";

describe("sumCentsByCurrency", () => {
  it("totals only the items of the requested currency", () => {
    const items = [
      USD_CHARGE_ONE,
      CRC_CHARGE,
      USD_CHARGE_TWO,
    ];

    expect(
      sumCentsByCurrency(items, CURRENCY_CODE.USD)
    ).toBe(CENTS_USD_CHARGED);
    expect(
      sumCentsByCurrency(items, CURRENCY_CODE.CRC)
    ).toBe(CENTS_CRC_CHARGED);
  });

  it("returns zero when no item matches", () => {
    expect(sumCentsByCurrency([], CURRENCY_CODE.USD)).toBe(
      NO_CENTS
    );
    expect(
      sumCentsByCurrency([CRC_CHARGE], CURRENCY_CODE.USD)
    ).toBe(NO_CENTS);
  });

  it("sums rounded cents so floats never drift", () => {
    expect(
      sumCentsByCurrency(
        [USD_TEN_CENTS, USD_TWENTY_CENTS],
        CURRENCY_CODE.USD
      )
    ).toBe(CENTS_THIRTY);
  });
});
