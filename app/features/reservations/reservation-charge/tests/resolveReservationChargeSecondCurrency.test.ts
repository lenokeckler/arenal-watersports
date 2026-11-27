import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { resolveReservationChargeSecondCurrency } from "../utils/resolveReservationChargeSecondCurrency";

describe("resolveReservationChargeSecondCurrency", () => {
  it.each([
    [CURRENCY_CODE.USD, CURRENCY_CODE.CRC],
    [CURRENCY_CODE.CRC, CURRENCY_CODE.USD],
  ])("pairs %s with %s", (currency, expected) => {
    expect(
      resolveReservationChargeSecondCurrency(currency)
    ).toBe(expected);
  });
});
