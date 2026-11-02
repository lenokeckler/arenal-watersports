import { describe, expect, it } from "vitest";
import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CHARGE_STATUS,
  RESERVATION_DETAIL_CURRENCY,
} from "../constants/ReservationDetail.constants";
import { calculateReservationDetailCharges } from "../utils/calculateReservationDetailCharges";
import {
  RESERVATION_DETAIL_PRICING_FIXTURE,
  RESERVATION_DETAIL_TEST,
} from "./ReservationDetailTest.constants";

describe("reservation detail charge status", () => {
  it("returns pending when no payment is recorded", () => {
    const summary = calculateReservationDetailCharges(
      RESERVATION_DETAIL_PRICING_FIXTURE,
      [],
      []
    );

    expect(summary.status).toBe(
      RESERVATION_DETAIL_CHARGE_STATUS.PENDING
    );
  });

  it("ignores payments in currencies without a configured target", () => {
    const summary = calculateReservationDetailCharges(
      {
        ...RESERVATION_DETAIL_PRICING_FIXTURE,
        agreed_amount_usd: null,
        list_amount_usd: null,
      },
      [
        {
          amount: RESERVATION_DETAIL_TEST.CHARGE_USD,
          currency: RESERVATION_DETAIL_CURRENCY.USD,
          kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
        },
      ],
      []
    );

    expect(summary.status).toBe(
      RESERVATION_DETAIL_CHARGE_STATUS.PENDING
    );
  });

  it("returns paid only when every configured currency target is met", () => {
    const summary = calculateReservationDetailCharges(
      RESERVATION_DETAIL_PRICING_FIXTURE,
      [
        {
          amount: RESERVATION_DETAIL_TEST.LIST_AMOUNT_CRC,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
          kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
        },
        {
          amount: RESERVATION_DETAIL_TEST.LIST_AMOUNT_USD,
          currency: RESERVATION_DETAIL_CURRENCY.USD,
          kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
        },
      ],
      []
    );

    expect(summary.status).toBe(
      RESERVATION_DETAIL_CHARGE_STATUS.PAID
    );
  });

  it("does not count extra-time charges toward the tariff target", () => {
    const summary = calculateReservationDetailCharges(
      {
        ...RESERVATION_DETAIL_PRICING_FIXTURE,
        agreed_amount_crc:
          RESERVATION_DETAIL_TEST.FULL_CHARGE_TARGET,
      },
      [
        {
          amount:
            RESERVATION_DETAIL_TEST.HALF_CHARGE_AMOUNT,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
          kind: RESERVATION_DETAIL_CHARGE_KIND.TARIFF,
        },
        {
          amount:
            RESERVATION_DETAIL_TEST.HALF_CHARGE_AMOUNT,
          currency: RESERVATION_DETAIL_CURRENCY.CRC,
          kind: RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME,
        },
      ],
      []
    );

    expect(summary.status).toBe(
      RESERVATION_DETAIL_CHARGE_STATUS.PARTIAL
    );
    expect(summary.charges[0].amountCharged).toBe(
      RESERVATION_DETAIL_TEST.HALF_CHARGE_AMOUNT
    );
  });
});
