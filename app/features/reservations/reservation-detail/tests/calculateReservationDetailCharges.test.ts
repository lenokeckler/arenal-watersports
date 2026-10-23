import { describe, expect, it } from "vitest";
import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CHARGE_STATUS,
  RESERVATION_DETAIL_CURRENCY,
} from "../constants/ReservationDetail.constants";
import { calculateReservationDetailCharges } from "../utils/calculateReservationDetailCharges";
import {
  RESERVATION_DETAIL_MONEY_FIXTURE,
  RESERVATION_DETAIL_PRICING_FIXTURE,
  RESERVATION_DETAIL_TEST,
} from "./ReservationDetailTest.constants";

describe("calculateReservationDetailCharges", () => {
  it("uses tariff charges and separates currencies", () => {
    const summary = calculateReservationDetailCharges(
      RESERVATION_DETAIL_PRICING_FIXTURE,
      [
        ...RESERVATION_DETAIL_MONEY_FIXTURE.charges,
        {
          amount: RESERVATION_DETAIL_TEST.CHARGE_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
          kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
        },
      ],
      RESERVATION_DETAIL_MONEY_FIXTURE.refunds
    );

    expect(summary.status).toBe(
      RESERVATION_DETAIL_CHARGE_STATUS.PARTIAL
    );
    expect(summary.charges).toEqual([
      {
        amountCharged: RESERVATION_DETAIL_TEST.CHARGE_CRC,
        amountRemaining:
          RESERVATION_DETAIL_TEST.LIST_AMOUNT_CRC -
          RESERVATION_DETAIL_TEST.CHARGE_CRC,
        amountTarget:
          RESERVATION_DETAIL_TEST.LIST_AMOUNT_CRC,
        currency: RESERVATION_DETAIL_CURRENCY.CRC,
      },
      {
        amountCharged: RESERVATION_DETAIL_TEST.CHARGE_USD,
        amountRemaining:
          RESERVATION_DETAIL_TEST.LIST_AMOUNT_USD -
          RESERVATION_DETAIL_TEST.CHARGE_USD,
        amountTarget:
          RESERVATION_DETAIL_TEST.LIST_AMOUNT_USD,
        currency: RESERVATION_DETAIL_CURRENCY.USD,
      },
    ]);
    expect(summary.extraTimeCharges[0].amountCharged).toBe(
      RESERVATION_DETAIL_TEST.CHARGE_CRC
    );
  });

  it("prefers agreed tariff and reports refunds separately", () => {
    const summary = calculateReservationDetailCharges(
      {
        ...RESERVATION_DETAIL_PRICING_FIXTURE,
        agreed_amount_crc:
          RESERVATION_DETAIL_TEST.CHARGE_CRC,
      },
      [
        {
          amount: RESERVATION_DETAIL_TEST.CHARGE_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
          kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
        },
        {
          amount: RESERVATION_DETAIL_TEST.LIST_AMOUNT_USD,
          currency: RESERVATION_DETAIL_CURRENCY.USD,
          kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
        },
      ],
      [
        {
          amount: RESERVATION_DETAIL_TEST.REFUND_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
        },
      ]
    );

    expect(summary.status).toBe(
      RESERVATION_DETAIL_CHARGE_STATUS.PAID
    );
    expect(summary.charges[0].amountTarget).toBe(
      RESERVATION_DETAIL_TEST.CHARGE_CRC
    );
    expect(summary.charges[0].amountCharged).toBe(
      RESERVATION_DETAIL_TEST.CHARGE_CRC
    );
    expect(summary.refunds[0].amount).toBe(
      RESERVATION_DETAIL_TEST.REFUND_CRC
    );
  });

  it("keeps extra-time gross separate from tariff and refunds", () => {
    const summary = calculateReservationDetailCharges(
      RESERVATION_DETAIL_PRICING_FIXTURE,
      [
        {
          amount: RESERVATION_DETAIL_TEST.CHARGE_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
          kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
        },
        {
          amount: RESERVATION_DETAIL_TEST.CHARGE_USD,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
          kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
        },
      ],
      [
        {
          amount: RESERVATION_DETAIL_TEST.REFUND_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
        },
      ]
    );

    expect(summary.charges[0].amountCharged).toBe(
      RESERVATION_DETAIL_TEST.CHARGE_CRC
    );
    expect(summary.extraTimeCharges[0].amountCharged).toBe(
      RESERVATION_DETAIL_TEST.CHARGE_USD
    );
    expect(summary.refunds[0].amount).toBe(
      RESERVATION_DETAIL_TEST.REFUND_CRC
    );
  });
});
