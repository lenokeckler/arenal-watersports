import { describe, expect, it } from "vitest";
import { hasAnyIncome } from "../utils/hasAnyIncome";
import {
  DAY_WITH_BOTH_CURRENCIES,
  DAY_WITH_ONLY_COLONES,
  DAY_WITHOUT_INCOME,
  DAY_WITHOUT_CURRENCIES,
} from "./DailyIncome.constants";

describe("hasAnyIncome", () => {
  it("is true when both currencies have payment methods", () => {
    expect(hasAnyIncome(DAY_WITH_BOTH_CURRENCIES)).toBe(
      true
    );
  });

  it("is true when only one currency has payment methods", () => {
    expect(hasAnyIncome(DAY_WITH_ONLY_COLONES)).toBe(true);
  });

  it("is false when no currency has payment methods", () => {
    expect(hasAnyIncome(DAY_WITHOUT_INCOME)).toBe(false);
  });

  it("is false when the day carries no currencies at all", () => {
    expect(hasAnyIncome(DAY_WITHOUT_CURRENCIES)).toBe(
      false
    );
  });
});
