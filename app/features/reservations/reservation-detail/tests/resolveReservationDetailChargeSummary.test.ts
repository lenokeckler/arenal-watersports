import { describe, expect, it } from "vitest";
import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CHARGE_STATUS,
  RESERVATION_DETAIL_CURRENCY,
} from "../constants/ReservationDetail.constants";
import { resolveReservationDetailChargeSummary } from "../utils/resolveReservationDetailChargeSummary";
import {
  RESERVATION_DETAIL_MONEY_FIXTURE,
  RESERVATION_DETAIL_PRICING_FIXTURE,
  RESERVATION_DETAIL_TEST,
} from "./ReservationDetailTest.constants";

describe("resolveReservationDetailChargeSummary", () => {
  it("identifies a split child's charge as belonging to its parent", () => {
    const summary = resolveReservationDetailChargeSummary(
      RESERVATION_DETAIL_TEST.PARENT_RESERVATION_ID,
      RESERVATION_DETAIL_PRICING_FIXTURE,
      [
        ...RESERVATION_DETAIL_MONEY_FIXTURE.charges,
        {
          amount: RESERVATION_DETAIL_TEST.CHARGE_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
          kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
        },
        {
          amount: RESERVATION_DETAIL_TEST.CHARGE_USD,
          currency: RESERVATION_DETAIL_CURRENCY.USD,
          kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
        },
      ],
      [
        {
          amount: RESERVATION_DETAIL_TEST.REFUND_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
        },
        {
          amount: RESERVATION_DETAIL_TEST.REFUND_USD,
          currency: RESERVATION_DETAIL_CURRENCY.USD,
        },
      ]
    );

    expect(summary.status).toBe(
      RESERVATION_DETAIL_CHARGE_STATUS.PARENT
    );
    expect(summary.charges).toEqual([
      {
        amountCharged: RESERVATION_DETAIL_TEST.ZERO_AMOUNT,
        amountRemaining: null,
        amountTarget: null,
        currency: RESERVATION_DETAIL_CURRENCY.CRC,
      },
      {
        amountCharged: RESERVATION_DETAIL_TEST.ZERO_AMOUNT,
        amountRemaining: null,
        amountTarget: null,
        currency: RESERVATION_DETAIL_CURRENCY.USD,
      },
    ]);
    expect(summary.extraTimeCharges).toEqual([
      {
        amountCharged: RESERVATION_DETAIL_TEST.CHARGE_CRC,
        currency: RESERVATION_DETAIL_CURRENCY.CRC,
      },
      {
        amountCharged: RESERVATION_DETAIL_TEST.CHARGE_USD,
        currency: RESERVATION_DETAIL_CURRENCY.USD,
      },
    ]);
    expect(summary.refunds).toEqual([
      {
        amount: RESERVATION_DETAIL_TEST.REFUND_CRC,
        currency: RESERVATION_DETAIL_CURRENCY.CRC,
      },
      {
        amount: RESERVATION_DETAIL_TEST.REFUND_USD,
        currency: RESERVATION_DETAIL_CURRENCY.USD,
      },
    ]);
  });

  it("does not expose extra-time charges on an ordinary reservation", () => {
    const summary = resolveReservationDetailChargeSummary(
      null,
      RESERVATION_DETAIL_PRICING_FIXTURE,
      RESERVATION_DETAIL_MONEY_FIXTURE.charges,
      RESERVATION_DETAIL_MONEY_FIXTURE.refunds
    );

    expect(summary.extraTimeCharges).toEqual([]);
  });
});
