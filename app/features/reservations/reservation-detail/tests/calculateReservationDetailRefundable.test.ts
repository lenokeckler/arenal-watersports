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
});
