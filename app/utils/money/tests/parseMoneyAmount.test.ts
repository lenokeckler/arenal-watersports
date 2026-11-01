import { describe, expect, it } from "vitest";
import { parseMoneyAmount } from "../parseMoneyAmount";
import { MONEY_AMOUNT_PARSE_CASES } from "./moneyAmount.constants";

describe("parseMoneyAmount", () => {
  it.each(MONEY_AMOUNT_PARSE_CASES)(
    "parses '$amountText' as $expectedAmount",
    ({ amountText, expectedAmount }) => {
      expect(parseMoneyAmount(amountText)).toBe(
        expectedAmount
      );
    }
  );
});
