import { describe, expect, it } from "vitest";
import { formatIncomeDate } from "../utils/formatIncomeDate";
import {
  EXPECTED_INCOME_DATE_TEXT,
  EXPECTED_NEW_YEAR_DATE_TEXT,
  INCOME_DATE,
  NEW_YEAR_DATE,
} from "./IncomeUtils.constants";

describe("formatIncomeDate", () => {
  it("prints the Costa Rica day as a long Spanish date", () => {
    expect(formatIncomeDate(INCOME_DATE)).toBe(
      EXPECTED_INCOME_DATE_TEXT
    );
  });

  it("prints the same calendar day it receives, whatever the machine zone", () => {
    expect(formatIncomeDate(NEW_YEAR_DATE)).toBe(
      EXPECTED_NEW_YEAR_DATE_TEXT
    );
  });
});
