import { describe, expect, it } from "vitest";
import {
  CALENDAR_VIEW,
  RESERVATION_CALENDAR_QUERY_ERROR,
} from "@/app/constants";
import { validateReservationCalendarPeriodRequest } from "../utils/validateReservationCalendarPeriodRequest";

describe("validateReservationCalendarPeriodRequest", (): void => {
  it("accepts supported view and civil anchor", (): void => {
    const request = {
      anchor: { year: 2026, month: 10, day: 14 },
      view: CALENDAR_VIEW.DAY,
    };

    expect(
      validateReservationCalendarPeriodRequest(request)
    ).toEqual(request);
  });

  it("rejects unknown views before reading data", (): void => {
    expect(() =>
      validateReservationCalendarPeriodRequest({
        anchor: { year: 2026, month: 10, day: 14 },
        view: "decade" as never,
      })
    ).toThrow(
      RESERVATION_CALENDAR_QUERY_ERROR.INVALID_VIEW
    );
  });

  it("rejects invalid civil dates", (): void => {
    expect(() =>
      validateReservationCalendarPeriodRequest({
        anchor: { year: 2026, month: 2, day: 30 },
        view: CALENDAR_VIEW.DAY,
      })
    ).toThrow();
  });
});
