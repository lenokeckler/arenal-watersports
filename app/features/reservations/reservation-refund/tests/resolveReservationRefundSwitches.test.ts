import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import { resolveReservationRefundAvailable } from "../utils/resolveReservationRefundAvailable";
import { resolveReservationRefundCurrencySwitch } from "../utils/resolveReservationRefundCurrencySwitch";
import { resolveReservationRefundReasonSwitch } from "../utils/resolveReservationRefundReasonSwitch";
import {
  BOTH_REFUNDABLE,
  USD_ONLY_REFUNDABLE,
} from "./ReservationRefundForm.constants";
import {
  AVAILABLE_CRC,
  AVAILABLE_USD,
  OTHER_REFUND_VALUES,
} from "./ReservationRefundValues.constants";

const NOTHING_AVAILABLE = 0;

describe("resolveReservationRefundCurrencySwitch", () => {
  it("changes the currency and keeps what was typed", () => {
    expect(
      resolveReservationRefundCurrencySwitch(
        OTHER_REFUND_VALUES,
        CURRENCY_CODE.CRC
      )
    ).toEqual({
      ...OTHER_REFUND_VALUES,
      currency: CURRENCY_CODE.CRC,
    });
  });
});

describe("resolveReservationRefundReasonSwitch", () => {
  it("keeps the free text while the other reason stays chosen", () => {
    expect(
      resolveReservationRefundReasonSwitch(
        OTHER_REFUND_VALUES,
        RESERVATION_REFUND_REASON.OTHER
      )
    ).toEqual(OTHER_REFUND_VALUES);
  });

  it("discards the free text when a preset reason is chosen", () => {
    expect(
      resolveReservationRefundReasonSwitch(
        OTHER_REFUND_VALUES,
        RESERVATION_REFUND_REASON.CUT_SHORT_TRIP
      )
    ).toEqual({
      ...OTHER_REFUND_VALUES,
      otherReasonText: STRING.Empty,
      reason: RESERVATION_REFUND_REASON.CUT_SHORT_TRIP,
    });
  });
});

describe("resolveReservationRefundAvailable", () => {
  it.each([
    {
      currency: CURRENCY_CODE.USD,
      expected: AVAILABLE_USD,
      refundable: BOTH_REFUNDABLE,
    },
    {
      currency: CURRENCY_CODE.CRC,
      expected: AVAILABLE_CRC,
      refundable: BOTH_REFUNDABLE,
    },
    {
      currency: CURRENCY_CODE.CRC,
      expected: NOTHING_AVAILABLE,
      refundable: USD_ONLY_REFUNDABLE,
    },
    {
      currency: CURRENCY_CODE.USD,
      expected: NOTHING_AVAILABLE,
      refundable: [],
    },
  ])(
    "gives the amount for the selected currency",
    ({ currency, expected, refundable }) => {
      expect(
        resolveReservationRefundAvailable(
          refundable,
          currency
        )
      ).toBe(expected);
    }
  );
});
