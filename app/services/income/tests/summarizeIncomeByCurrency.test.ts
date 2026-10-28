import { describe, expect, it } from "vitest";
import { summarizeIncomeByCurrency } from "../summarizeIncomeByCurrency";
import {
  EXPECTED_EMPTY_SUMMARY,
  EXPECTED_MAXIMUM_COLONES_TOTAL,
  EXPECTED_MIXED_SUMMARY,
  EXPECTED_ONLY_COLONES_SUMMARY,
  MAXIMUM_COLONES_CHARGE_PLUS_ONE_CENT,
  MIXED_CURRENCIES,
  ONLY_COLONES,
} from "./Income.constants";

describe("summarizeIncomeByCurrency", () => {
  it("totals each currency on its own, dollars first, never adding across currencies", () => {
    expect(
      summarizeIncomeByCurrency(MIXED_CURRENCIES)
    ).toEqual(EXPECTED_MIXED_SUMMARY);
  });

  it("keeps a currency without charges with a zero total and no methods", () => {
    expect(summarizeIncomeByCurrency(ONLY_COLONES)).toEqual(
      EXPECTED_ONLY_COLONES_SUMMARY
    );
  });

  it("returns every currency at zero when the day has no charge", () => {
    expect(summarizeIncomeByCurrency([])).toEqual(
      EXPECTED_EMPTY_SUMMARY
    );
  });

  it("keeps the exact colon total of the largest storable charge plus one cent", () => {
    expect(
      summarizeIncomeByCurrency(
        MAXIMUM_COLONES_CHARGE_PLUS_ONE_CENT
      )[1].total
    ).toBe(EXPECTED_MAXIMUM_COLONES_TOTAL);
  });
});
