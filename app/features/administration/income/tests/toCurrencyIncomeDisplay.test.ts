import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { toCurrencyIncomeDisplay } from "../utils/toCurrencyIncomeDisplay";
import {
  BALANCED_SUMMARY,
  IDLE_SUMMARY,
  NEGATIVE_NET_MAGNITUDE,
  NEGATIVE_SUMMARY,
  POSITIVE_COLLECTED_AMOUNT,
  POSITIVE_NET_AMOUNT,
  POSITIVE_REFUNDED_AMOUNT,
  POSITIVE_SUMMARY,
  REFUND_ONLY_SUMMARY,
} from "./IncomeUtils.constants";

describe("toCurrencyIncomeDisplay", () => {
  it("turns the cents of one currency into amounts of that same currency", () => {
    expect(
      toCurrencyIncomeDisplay(POSITIVE_SUMMARY)
    ).toEqual({
      currency: CURRENCY_CODE.USD,
      hasMovement: true,
      collected: {
        amount: POSITIVE_COLLECTED_AMOUNT,
        currency: CURRENCY_CODE.USD,
      },
      refunded: {
        amount: POSITIVE_REFUNDED_AMOUNT,
        currency: CURRENCY_CODE.USD,
      },
      net: {
        amount: POSITIVE_NET_AMOUNT,
        currency: CURRENCY_CODE.USD,
      },
      isNetNegative: false,
    });
  });

  it("keeps a negative net as a magnitude and flags it", () => {
    const display = toCurrencyIncomeDisplay(
      NEGATIVE_SUMMARY
    );

    expect(display.net.amount).toBe(NEGATIVE_NET_MAGNITUDE);
    expect(display.isNetNegative).toBe(true);
  });

  it("counts a day whose refunds cancel its charges as movement with a zero net", () => {
    const display = toCurrencyIncomeDisplay(
      BALANCED_SUMMARY
    );

    expect(display.hasMovement).toBe(true);
    expect(display.net.amount).toBe(0);
    expect(display.isNetNegative).toBe(false);
  });

  it("counts refunds without charges as movement", () => {
    expect(
      toCurrencyIncomeDisplay(REFUND_ONLY_SUMMARY)
        .hasMovement
    ).toBe(true);
  });

  it("reports no movement when nothing was charged or refunded", () => {
    expect(
      toCurrencyIncomeDisplay(IDLE_SUMMARY).hasMovement
    ).toBe(false);
  });
});
