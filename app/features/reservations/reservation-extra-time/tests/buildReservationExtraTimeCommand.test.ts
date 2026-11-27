import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  PAYMENT_CHOICE,
} from "@/app/constants";
import { RESERVATION_EXTRA_TIME_OUTCOME as OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { buildReservationExtraTimeCommand } from "../utils/buildReservationExtraTimeCommand";
import {
  EXTRA_TIME_AMOUNT,
  EXTRA_TIME_CHARGED_INPUT,
  EXTRA_TIME_COURTESY_INPUT,
  EXTRA_TIME_OTHER_METHOD,
  EXTRA_TIME_RESERVATION_ID,
} from "./ReservationExtraTime.constants";

describe("buildReservationExtraTimeCommand", () => {
  it("builds a charge with the amount, currency and chip label", () => {
    expect(
      buildReservationExtraTimeCommand(
        EXTRA_TIME_CHARGED_INPUT,
        OUTCOME.CHARGED
      )
    ).toEqual({
      charge: {
        amount: EXTRA_TIME_AMOUNT,
        currency: CURRENCY_CODE.USD,
        paymentMethod: "Efectivo",
      },
      outcome: OUTCOME.CHARGED,
      reservationId: EXTRA_TIME_RESERVATION_ID,
    });
  });

  it("sends the trimmed text typed under Otro", () => {
    expect(
      buildReservationExtraTimeCommand(
        {
          ...EXTRA_TIME_CHARGED_INPUT,
          otherPaymentMethod: `  ${EXTRA_TIME_OTHER_METHOD} `,
          paymentChoice: PAYMENT_CHOICE.OTHER,
        },
        OUTCOME.CHARGED
      ).charge?.paymentMethod
    ).toBe(EXTRA_TIME_OTHER_METHOD);
  });

  it("sends no charge for a courtesy even with leftover fields", () => {
    expect(
      buildReservationExtraTimeCommand(
        {
          ...EXTRA_TIME_COURTESY_INPUT,
          amountText: EXTRA_TIME_CHARGED_INPUT.amountText,
          paymentChoice: PAYMENT_CHOICE.CASH,
        },
        OUTCOME.COURTESY
      )
    ).toEqual({
      charge: null,
      outcome: OUTCOME.COURTESY,
      reservationId: EXTRA_TIME_RESERVATION_ID,
    });
  });
});
