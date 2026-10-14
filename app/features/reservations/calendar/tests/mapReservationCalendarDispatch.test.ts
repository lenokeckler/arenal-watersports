import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_ERROR } from "../constants/ReservationCalendarProjection.constants";
import type { ReservationCalendarDispatchSource } from "../models/ReservationCalendarDispatchSource.interface";
import { mapReservationCalendarDispatch } from "../utils/mapReservationCalendarDispatch";
import {
  CALENDAR_CATEGORY,
  CALENDAR_DISPATCH,
  CALENDAR_RESERVATION,
  EMPTY_CALENDAR_LABEL,
} from "./ReservationCalendar.constants";

describe("calendar actual departure groups", () => {
  it("retains a group closed exactly at its departure time", (): void => {
    const source = {
      ...CALENDAR_DISPATCH,
      closed_at: CALENDAR_DISPATCH.dispatched_at,
    };

    const group = mapReservationCalendarDispatch(source);

    expect(group.closedAt).toBe(source.dispatched_at);
  });

  it.each<Partial<ReservationCalendarDispatchSource>>([
    { category: null },
    {
      category: {
        ...CALENDAR_CATEGORY,
        name: EMPTY_CALENDAR_LABEL,
      },
    },
    { category_id: CALENDAR_RESERVATION.id },
    { ends_at: CALENDAR_DISPATCH.dispatched_at },
    { ends_at: CALENDAR_RESERVATION.starts_at },
    { closed_at: CALENDAR_RESERVATION.starts_at },
  ])(
    "rejects broken group relation or interval %j",
    (overrides): void => {
      expect(() =>
        mapReservationCalendarDispatch({
          ...CALENDAR_DISPATCH,
          ...overrides,
        })
      ).toThrow(
        RESERVATION_CALENDAR_ERROR.INVALID_DISPATCH
      );
    }
  );
});
