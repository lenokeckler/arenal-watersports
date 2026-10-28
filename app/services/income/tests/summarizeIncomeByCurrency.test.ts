import { describe, expect, it } from "vitest";
import { summarizeIncomeByCurrency } from "../summarizeIncomeByCurrency";
import {
  EXPECTED_EMPTY_SUMMARY,
  EXPECTED_MIXED_SUMMARY,
  EXPECTED_ONLY_COLONES_SUMMARY,
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
});
