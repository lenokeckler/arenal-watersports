import { describe, expect, it } from "vitest";
import { findMoneyAmountIssue } from "../findMoneyAmountIssue";
import { MONEY_AMOUNT_LIMITS } from "./moneyAmount.constants";
import { MONEY_AMOUNT_EDGE_CASES } from "./moneyAmountEdge.constants";

describe("findMoneyAmountIssue edges", () => {
  it.each(MONEY_AMOUNT_EDGE_CASES)(
    "judges '$amountText' as $expectedIssue",
    ({ amountText, expectedIssue }) => {
      expect(
        findMoneyAmountIssue(
          amountText,
          MONEY_AMOUNT_LIMITS
        )
      ).toBe(expectedIssue);
    }
  );
});
