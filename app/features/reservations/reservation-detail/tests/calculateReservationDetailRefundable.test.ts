import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CURRENCY,
} from "../constants/ReservationDetail.constants";
import { calculateReservationDetailRefundable } from "../utils/calculateReservationDetailRefundable";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";

const TARIFF_USD = {
  amount: RESERVATION_DETAIL_TEST.CHARGE_USD,
  currency: RESERVATION_DETAIL_CURRENCY.USD,
  kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
};
const EXTRA_TIME_CRC = {
  amount: RESERVATION_DETAIL_TEST.CHARGE_CRC,
  currency: RESERVATION_DETAIL_CURRENCY.CRC,
  kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
};
const REFUND_USD = {
  amount: RESERVATION_DETAIL_TEST.REFUND_USD,
  currency: RESERVATION_DETAIL_CURRENCY.USD,
};
const TENTH = 0.1;
const FIFTH = 0.2;
const THREE_TENTHS = 0.3;
const FIRST_PARTIAL = 10;
const SECOND_PARTIAL = 15;
const EXCESS = 5;

const usdEntry = (amount: number) => ({
  amount,
  currency: RESERVATION_DETAIL_CURRENCY.USD,
});

const usdTariff = (amount: number) => ({
  ...usdEntry(amount),
  kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
});

describe("calculateReservationDetailRefundable", () => {
  it("lists USD then CRC at zero when nothing was charged", () => {
    expect(
      calculateReservationDetailRefundable([], [])
    ).toEqual([
      {
        amount: RESERVATION_DETAIL_TEST.ZERO_AMOUNT,
        currency: CURRENCY_CODE.USD,
      },
      {
        amount: RESERVATION_DETAIL_TEST.ZERO_AMOUNT,
        currency: CURRENCY_CODE.CRC,
      },
    ]);
  });

  it("counts tariff and extra time charges minus refunds per currency", () => {
    expect(
      calculateReservationDetailRefundable(
        [TARIFF_USD, EXTRA_TIME_CRC],
        [REFUND_USD]
      )
    ).toEqual([
      {
        amount:
          RESERVATION_DETAIL_TEST.CHARGE_USD -
          RESERVATION_DETAIL_TEST.REFUND_USD,
        currency: CURRENCY_CODE.USD,
      },
      {
        amount: RESERVATION_DETAIL_TEST.CHARGE_CRC,
        currency: CURRENCY_CODE.CRC,
      },
    ]);
  });

  it("returns zero for a fully refunded currency", () => {
    expect(
      calculateReservationDetailRefundable(
        [TARIFF_USD],
        [
          {
            ...REFUND_USD,
            amount: RESERVATION_DETAIL_TEST.CHARGE_USD,
          },
        ]
      )[0].amount
    ).toBe(RESERVATION_DETAIL_TEST.ZERO_AMOUNT);
  });

  it("goes negative when refunds exceed charges", () => {
    expect(
      calculateReservationDetailRefundable(
        [TARIFF_USD],
        [
          usdEntry(
            RESERVATION_DETAIL_TEST.CHARGE_USD + EXCESS
          ),
        ]
      )[0].amount
    ).toBe(-EXCESS);
  });

  it("nets decimal charges and refunds without float drift", () => {
    expect(
      calculateReservationDetailRefundable(
        [usdTariff(TENTH), usdTariff(FIFTH)],
        [usdEntry(THREE_TENTHS)]
      )[0].amount
    ).toBe(RESERVATION_DETAIL_TEST.ZERO_AMOUNT);
  });

  it("subtracts several partial refunds in one currency", () => {
    expect(
      calculateReservationDetailRefundable(
        [TARIFF_USD],
        [usdEntry(FIRST_PARTIAL), usdEntry(SECOND_PARTIAL)]
      )[0].amount
    ).toBe(
      RESERVATION_DETAIL_TEST.CHARGE_USD -
        FIRST_PARTIAL -
        SECOND_PARTIAL
    );
  });

  it("keeps the other currency net when only one is refunded", () => {
    expect(
      calculateReservationDetailRefundable(
        [TARIFF_USD, EXTRA_TIME_CRC],
        [usdEntry(RESERVATION_DETAIL_TEST.CHARGE_USD)]
      ).map(({ amount }) => amount)
    ).toEqual([
      RESERVATION_DETAIL_TEST.ZERO_AMOUNT,
      RESERVATION_DETAIL_TEST.CHARGE_CRC,
    ]);
  });

  it("reports only the colones net when nothing was charged in dollars", () => {
    expect(
      calculateReservationDetailRefundable(
        [EXTRA_TIME_CRC],
        []
      ).map(({ amount }) => amount)
    ).toEqual([
      RESERVATION_DETAIL_TEST.ZERO_AMOUNT,
      RESERVATION_DETAIL_TEST.CHARGE_CRC,
    ]);
  });
});
