import { describe, expect, it } from "vitest";
import { countMoneyAmountDecimals } from "../countMoneyAmountDecimals";

describe("countMoneyAmountDecimals", () => {
  it.each([
    ["45", 0],
    ["45.5", 1],
    ["45.50", 2],
    ["45,505", 3],
    ["0.001", 3],
    ["", 0],
  ])(
    "counts the decimals of %j",
    (amountText, expected) => {
      expect(countMoneyAmountDecimals(amountText)).toBe(
        expected
      );
    }
  );
});
