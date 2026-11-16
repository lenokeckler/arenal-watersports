import { describe, expect, it } from "vitest";
import { parseReservationRefundAmount } from "../utils/parseReservationRefundAmount";

describe("parseReservationRefundAmount", () => {
  it.each([
    ["45.50", 45.5],
    ["45,50", 45.5],
    ["  25000 ", 25000],
  ])("reads %s as %d", (amountText, expected) => {
    expect(parseReservationRefundAmount(amountText)).toBe(
      expected
    );
  });
});
