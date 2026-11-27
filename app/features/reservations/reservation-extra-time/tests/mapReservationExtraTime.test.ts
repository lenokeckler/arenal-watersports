import { describe, expect, it } from "vitest";
import { RESERVATION_STATUS } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import { RESERVATION_EXTRA_TIME_SOURCE } from "../constants/ReservationExtraTimeSource.constants";
import { mapReservationExtraTime } from "../utils/mapReservationExtraTime";
import {
  EXTRA_TIME_EXTENDED_ROW,
  EXTRA_TIME_NONE,
  EXTRA_TIME_OVERDUE_ROW,
  EXTRA_TIME_RESERVATION_ROW,
  EXTRA_TIME_TOTAL_MINUTES,
} from "./ReservationExtraTime.constants";

describe("mapReservationExtraTime", () => {
  it("maps every group and adds their minutes for the reservation", () => {
    const extraTime = mapReservationExtraTime(
      EXTRA_TIME_RESERVATION_ROW,
      [EXTRA_TIME_OVERDUE_ROW, EXTRA_TIME_EXTENDED_ROW],
      null
    );

    expect(extraTime).toMatchObject({
      code: EXTRA_TIME_RESERVATION_ROW.code,
      customerName:
        EXTRA_TIME_RESERVATION_ROW.customer_name,
      id: EXTRA_TIME_RESERVATION_ROW.id,
      resolution: null,
      status: RESERVATION_STATUS.CLOSED,
      totalMinutes: EXTRA_TIME_TOTAL_MINUTES,
    });
    expect(extraTime.groups).toEqual([
      {
        arrivedAt: EXTRA_TIME_OVERDUE_ROW.arrived_at,
        categoryId: EXTRA_TIME_OVERDUE_ROW.category_id,
        categoryName: EXTRA_TIME_OVERDUE_ROW.category_name,
        dispatchedAt: EXTRA_TIME_OVERDUE_ROW.dispatched_at,
        extendedMinutes:
          EXTRA_TIME_OVERDUE_ROW.extended_minutes,
        extraMinutes: EXTRA_TIME_OVERDUE_ROW.extra_minutes,
        plannedReturnsAt:
          EXTRA_TIME_OVERDUE_ROW.planned_returns_at,
        source: RESERVATION_EXTRA_TIME_SOURCE.OVERDUE,
      },
      expect.objectContaining({
        source: RESERVATION_EXTRA_TIME_SOURCE.EXTENDED,
      }),
    ]);
  });

  it("keeps the decision already made", () => {
    expect(
      mapReservationExtraTime(
        EXTRA_TIME_RESERVATION_ROW,
        [],
        {
          extra_minutes: EXTRA_TIME_TOTAL_MINUTES,
          outcome: RESERVATION_EXTRA_TIME_OUTCOME.COURTESY,
        }
      )
    ).toMatchObject({
      groups: [],
      resolution: {
        extraMinutes: EXTRA_TIME_TOTAL_MINUTES,
        outcome: RESERVATION_EXTRA_TIME_OUTCOME.COURTESY,
      },
      totalMinutes: EXTRA_TIME_NONE,
    });
  });
});
