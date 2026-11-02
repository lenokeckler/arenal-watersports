import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { summarizeIncomeByCurrency } from "../summarizeIncomeByCurrency";
import {
  CENTS_LARGE_CRC,
  CENTS_REPEATED_PRICE,
  CENTS_USD_ONLY_REFUND,
  CENTS_USD_ONLY_REFUND_NET,
  LARGE_CRC_CHARGE,
  NO_CENTS,
  REPEAT_COUNT,
  UNKNOWN_CURRENCY_CHARGE,
  USD_ONLY_REFUND,
  USD_PRICE_WITH_CENTS,
} from "./IncomeReportEdges.constants";

describe("summarizeIncomeByCurrency edges", () => {
  it("reports a negative net when there are refunds and no charges", () => {
    const [usd] = summarizeIncomeByCurrency({
      charges: [],
      refunds: [USD_ONLY_REFUND],
    });

    expect(usd).toEqual({
      currency: CURRENCY_CODE.USD,
      chargedCents: NO_CENTS,
      refundedCents: CENTS_USD_ONLY_REFUND,
      netCents: CENTS_USD_ONLY_REFUND_NET,
    });
  });

  it("sums a thousand charges of 19.99 exactly", () => {
    const charges = Array.from(
      { length: REPEAT_COUNT },
      () => USD_PRICE_WITH_CENTS
    );

    const [usd] = summarizeIncomeByCurrency({
      charges,
      refunds: [],
    });

    expect(usd.chargedCents).toBe(CENTS_REPEATED_PRICE);
  });

  it("keeps a ten-billion colones charge exact in cents", () => {
    const [, crc] = summarizeIncomeByCurrency({
      charges: [LARGE_CRC_CHARGE],
      refunds: [],
    });

    expect(crc.chargedCents).toBe(CENTS_LARGE_CRC);
    expect(crc.netCents).toBe(CENTS_LARGE_CRC);
  });

  it("leaves a movement in an unknown currency out of every total", () => {
    const summaries = summarizeIncomeByCurrency({
      charges: [UNKNOWN_CURRENCY_CHARGE],
      refunds: [],
    });

    summaries.forEach((summary) => {
      expect(summary.chargedCents).toBe(NO_CENTS);
      expect(summary.netCents).toBe(NO_CENTS);
    });
  });
});
