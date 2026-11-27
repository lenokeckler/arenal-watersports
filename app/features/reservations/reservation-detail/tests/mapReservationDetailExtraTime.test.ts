import { describe, expect, it } from "vitest";
import {
  RESERVATION_DETAIL_EXTRA_TIME_OUTCOME as OUTCOME,
  RESERVATION_DETAIL_EXTRA_TIME_STATE as STATE,
  RESERVATION_DETAIL_NO_EXTRA_MINUTES,
} from "../constants/ReservationDetail.constants";
import { mapReservationDetailExtraTime } from "../utils/mapReservationDetailExtraTime";
import { RESERVATION_DETAIL_EXTRA_TIME_TEST as TEST } from "./ReservationDetailExtraTimeTest.constants";

describe("mapReservationDetailExtraTime", () => {
  it("keeps the decision already made with its minutes", () => {
    expect(
      mapReservationDetailExtraTime(
        {
          extra_minutes: TEST.MINUTES,
          outcome: OUTCOME.COURTESY,
        },
        RESERVATION_DETAIL_NO_EXTRA_MINUTES
      )
    ).toEqual({
      minutes: TEST.MINUTES,
      state: STATE.COURTESY,
    });
  });

  it("marks the minutes still to decide", () => {
    expect(
      mapReservationDetailExtraTime(null, TEST.MINUTES)
    ).toEqual({
      minutes: TEST.MINUTES,
      state: STATE.PENDING,
    });
  });

  it("shows nothing without extra time", () => {
    expect(
      mapReservationDetailExtraTime(
        null,
        RESERVATION_DETAIL_NO_EXTRA_MINUTES
      )
    ).toBeNull();
  });
});
