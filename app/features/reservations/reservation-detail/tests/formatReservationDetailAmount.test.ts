import { describe, expect, it } from "vitest";
import { RESERVATION_DETAIL_CURRENCY } from "../constants/ReservationDetail.constants";
import { formatReservationDetailAmount } from "../utils/formatReservationDetailAmount";
import { RESERVATION_DETAIL_AMOUNT_FORMAT_TEST as test } from "./ReservationDetailAmountFormat.constants";

describe("formatReservationDetailAmount", (): void => {
  it("formats Costa Rican colones with cents when present", (): void => {
    expect(
      formatReservationDetailAmount(
        test.CRC_AMOUNT,
        RESERVATION_DETAIL_CURRENCY.CRC
      )
    ).toBe(test.CRC_EXPECTED);
  });

  it("formats fractional Costa Rican colones to cents", (): void => {
    expect(
      formatReservationDetailAmount(
        test.CRC_ROUNDING_AMOUNT,
        RESERVATION_DETAIL_CURRENCY.CRC
      )
    ).toBe(test.CRC_ROUNDING_EXPECTED);
  });

  it("formats US dollars with two decimal digits", (): void => {
    expect(
      formatReservationDetailAmount(
        test.USD_AMOUNT,
        RESERVATION_DETAIL_CURRENCY.USD
      )
    ).toBe(test.USD_EXPECTED);
  });

  it("rounds US dollars to two decimal digits", (): void => {
    expect(
      formatReservationDetailAmount(
        test.USD_ROUNDING_AMOUNT,
        RESERVATION_DETAIL_CURRENCY.USD
      )
    ).toBe(test.USD_ROUNDING_EXPECTED);
  });
});
