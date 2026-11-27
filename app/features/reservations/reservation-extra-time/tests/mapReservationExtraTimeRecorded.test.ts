import { describe, expect, it } from "vitest";
import { RESERVATION_EXTRA_TIME_OUTCOME as OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { mapReservationExtraTimeRecorded } from "../utils/mapReservationExtraTimeRecorded";
import {
  EXTRA_TIME_CHARGED_RECORD_ROW,
  EXTRA_TIME_CHARGE_ID,
  EXTRA_TIME_RECORDED_BY,
  EXTRA_TIME_TOTAL_MINUTES,
} from "./ReservationExtraTime.constants";

describe("mapReservationExtraTimeRecorded", () => {
  it("maps a charged decision with its charge", () => {
    expect(
      mapReservationExtraTimeRecorded(
        EXTRA_TIME_CHARGED_RECORD_ROW
      )
    ).toEqual({
      charge: {
        amount:
          EXTRA_TIME_CHARGED_RECORD_ROW.charged_amount,
        chargeId: EXTRA_TIME_CHARGE_ID,
        currency:
          EXTRA_TIME_CHARGED_RECORD_ROW.charged_currency,
        paymentMethod:
          EXTRA_TIME_CHARGED_RECORD_ROW.charged_payment_method,
      },
      extraMinutes: EXTRA_TIME_TOTAL_MINUTES,
      outcome: OUTCOME.CHARGED,
      recordedByName: EXTRA_TIME_RECORDED_BY,
    });
  });

  it("maps a courtesy without a charge", () => {
    expect(
      mapReservationExtraTimeRecorded({
        ...EXTRA_TIME_CHARGED_RECORD_ROW,
        charge_id: null,
        charged_amount: null,
        charged_currency: null,
        charged_payment_method: null,
        outcome: OUTCOME.COURTESY,
      })
    ).toMatchObject({
      charge: null,
      outcome: OUTCOME.COURTESY,
    });
  });
});
