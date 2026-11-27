import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  RESERVATION_DEPOSIT_DECISION_KIND,
} from "@/app/constants";
import { mapReservationDepositRecorded } from "../utils/mapReservationDepositRecorded";
import {
  DECLINED_RECORD_ROW,
  DEPOSIT_ID,
  RECEIVED_RECORD_ROW,
  RECORDED_BY_NAME,
} from "./ReservationDepositAction.constants";

describe("mapReservationDepositRecorded", () => {
  it("maps a received deposit with its author", () => {
    expect(
      mapReservationDepositRecorded(RECEIVED_RECORD_ROW)
    ).toEqual({
      decision: {
        amount: 200,
        currency: CURRENCY_CODE.USD,
        kind: RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED,
      },
      id: DEPOSIT_ID,
      recordedByName: RECORDED_BY_NAME,
    });
  });

  it("maps the no deposit answer without amount nor id", () => {
    expect(
      mapReservationDepositRecorded(DECLINED_RECORD_ROW)
    ).toEqual({
      decision: {
        kind: RESERVATION_DEPOSIT_DECISION_KIND.DECLINED,
      },
      id: null,
      recordedByName: RECORDED_BY_NAME,
    });
  });
});
