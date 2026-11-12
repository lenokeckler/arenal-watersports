import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  CURRENCY_ORDER,
} from "@/app/constants";
import type { CurrencyCode } from "@/app/constants";
import { summarizeIncomeByCurrency } from "../summarizeIncomeByCurrency";
import type { CurrencyIncomeSummary } from "../models/CurrencyIncomeSummary.interface";
import {
  CENTS_CRC_CHARGED,
  CENTS_CRC_NET,
  CENTS_CRC_NET_NEGATIVE,
  CENTS_CRC_REFUNDED,
  CENTS_THIRTY,
  CENTS_USD_CHARGED,
  CENTS_USD_NET,
  CENTS_USD_REFUNDED,
  CRC_CHARGE,
  CRC_REFUND,
  LARGE_CRC_REFUND,
  NO_CENTS,
  SUMMARY_COUNT,
  SUMMARY_KEYS,
  USD_CHARGE_ONE,
  USD_CHARGE_TWO,
  USD_REFUND,
  USD_TEN_CENTS,
  USD_TWENTY_CENTS,
} from "./IncomeReportSummary.constants";

const summaryOf = (
  summaries: CurrencyIncomeSummary[],
  currency: CurrencyCode
) =>
  summaries.find(
    (summary) => summary.currency === currency
  );

describe("summarizeIncomeByCurrency", () => {
  it("keeps each currency separate", () => {
    const summaries = summarizeIncomeByCurrency({
      charges: [USD_CHARGE_ONE, USD_CHARGE_TWO, CRC_CHARGE],
      refunds: [USD_REFUND, CRC_REFUND],
    });

    expect(summaryOf(summaries, CURRENCY_CODE.USD)).toEqual(
      {
        currency: CURRENCY_CODE.USD,
        chargedCents: CENTS_USD_CHARGED,
        refundedCents: CENTS_USD_REFUNDED,
        netCents: CENTS_USD_NET,
      }
    );
    expect(summaryOf(summaries, CURRENCY_CODE.CRC)).toEqual(
      {
        currency: CURRENCY_CODE.CRC,
        chargedCents: CENTS_CRC_CHARGED,
        refundedCents: CENTS_CRC_REFUNDED,
        netCents: CENTS_CRC_NET,
      }
    );
  });

  it("returns both currencies in order with zeros when empty", () => {
    const summaries = summarizeIncomeByCurrency({
      charges: [],
      refunds: [],
    });

    expect(
      summaries.map((summary) => summary.currency)
    ).toEqual(CURRENCY_ORDER);
    summaries.forEach((summary) => {
      expect(summary.chargedCents).toBe(NO_CENTS);
      expect(summary.refundedCents).toBe(NO_CENTS);
      expect(summary.netCents).toBe(NO_CENTS);
    });
  });

  it("never lets a refund in one currency touch the other", () => {
    const summaries = summarizeIncomeByCurrency({
      charges: [USD_CHARGE_ONE],
      refunds: [CRC_REFUND],
    });

    expect(
      summaryOf(summaries, CURRENCY_CODE.USD)
    ).toMatchObject({
      refundedCents: NO_CENTS,
      netCents: summaryOf(summaries, CURRENCY_CODE.USD)
        ?.chargedCents,
    });
    expect(
      summaryOf(summaries, CURRENCY_CODE.CRC)
    ).toMatchObject({
      chargedCents: NO_CENTS,
      refundedCents: CENTS_CRC_REFUNDED,
    });
  });

  it("goes negative when refunds exceed charges", () => {
    const summaries = summarizeIncomeByCurrency({
      charges: [CRC_CHARGE],
      refunds: [LARGE_CRC_REFUND],
    });

    expect(
      summaryOf(summaries, CURRENCY_CODE.CRC)?.netCents
    ).toBe(CENTS_CRC_NET_NEGATIVE);
  });

  it("adds charges of 0.1 and 0.2 to exactly 30 cents", () => {
    const summaries = summarizeIncomeByCurrency({
      charges: [USD_TEN_CENTS, USD_TWENTY_CENTS],
      refunds: [],
    });

    expect(
      summaryOf(summaries, CURRENCY_CODE.USD)?.chargedCents
    ).toBe(CENTS_THIRTY);
  });

  it("carries no combined total across currencies", () => {
    const summaries = summarizeIncomeByCurrency({
      charges: [USD_CHARGE_ONE, CRC_CHARGE],
      refunds: [USD_REFUND],
    });

    expect(summaries).toHaveLength(SUMMARY_COUNT);
    summaries.forEach((summary) => {
      expect(Object.keys(summary).sort()).toEqual(
        SUMMARY_KEYS
      );
    });
  });
});
