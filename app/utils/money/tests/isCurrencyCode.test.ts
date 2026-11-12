import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { isCurrencyCode } from "../isCurrencyCode";

describe("isCurrencyCode", () => {
  it.each([CURRENCY_CODE.USD, CURRENCY_CODE.CRC])(
    "accepts %s",
    (currency) => {
      expect(isCurrencyCode(currency)).toBe(true);
    }
  );

  it.each([
    "usd",
    "EUR",
    "",
    " USD",
    null,
    undefined,
    1,
    {},
  ])("refuses %j", (value) => {
    expect(isCurrencyCode(value)).toBe(false);
  });
});
