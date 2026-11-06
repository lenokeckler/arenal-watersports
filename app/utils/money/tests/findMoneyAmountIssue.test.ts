import { describe, expect, it } from "vitest";
import { MONEY_AMOUNT_ISSUE } from "@/app/constants";
import { findMoneyAmountIssue } from "../findMoneyAmountIssue";
import {
  MONEY_AMOUNT_ISSUE_CASES,
  MONEY_AMOUNT_LIMITS,
  STRICTER_DECIMAL_LIMITS,
} from "./moneyAmount.constants";

describe("findMoneyAmountIssue", () => {
  it.each(MONEY_AMOUNT_ISSUE_CASES)(
    "judges $amountText as $expectedIssue",
    ({ amountText, expectedIssue }) => {
      expect(
        findMoneyAmountIssue(
          amountText,
          MONEY_AMOUNT_LIMITS
        )
      ).toBe(expectedIssue);
    }
  );

  it("applies the decimal places of the given limits", () => {
    expect(
      findMoneyAmountIssue("1.5", STRICTER_DECIMAL_LIMITS)
    ).toBe(MONEY_AMOUNT_ISSUE.PRECISION);
  });
});
