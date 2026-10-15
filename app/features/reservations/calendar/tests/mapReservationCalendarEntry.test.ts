import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_ERROR } from "@/app/components/reservation-calendar/constants/ReservationCalendarProjection.constants";
import type { ReservationCalendarDispatch } from "@/app/components/reservation-calendar/models/ReservationCalendarDispatch.interface";
import { mapReservationCalendarEntry } from "../utils/mapReservationCalendarEntry";
import {
  CALENDAR_CATEGORY,
  CALENDAR_DISPATCH,
  CALENDAR_RESERVATION,
  EXTRA_COMMITMENT,
} from "./ReservationCalendar.constants";

describe("scheduled facts", (): void => {
  it("retains full customer name and scheduled times without mutating source", (): void => {
    const original = structuredClone(CALENDAR_RESERVATION);
    const entry = mapReservationCalendarEntry(
      CALENDAR_RESERVATION
    );

    expect(entry.customerName).toBe(original.customer_name);
    expect(entry.startsAt).toBe(original.starts_at);
    expect(entry.endsAt).toBe(original.ends_at);
    expect(entry.status).toBe(original.status);
    expect(entry.id).toBe(original.id);
    expect(CALENDAR_RESERVATION).toEqual(original);
  });

  it("retains a reservation when it has no equipment", (): void => {
    expect(
      mapReservationCalendarEntry({
        ...CALENDAR_RESERVATION,
        reservation_items: [],
      }).equipment
    ).toEqual([]);
    expect(
      mapReservationCalendarEntry({
        ...CALENDAR_RESERVATION,
        reservation_items: [EXTRA_COMMITMENT],
      }).equipment
    ).toEqual([]);
  });
});

describe("actual groups", (): void => {
  it("preserves closed and open groups independently of the booked schedule", (): void => {
    const closedGroup = {
      ...CALENDAR_DISPATCH,
      closed_at: CALENDAR_DISPATCH.ends_at,
    };
    const openGroup = {
      ...CALENDAR_DISPATCH,
      id: CALENDAR_RESERVATION.id,
      ends_at: null,
    };
    const source = {
      ...CALENDAR_RESERVATION,
      reservation_dispatches: [closedGroup, openGroup],
    };
    const original = structuredClone(source);
    const entry = mapReservationCalendarEntry(source);

    expect(entry.dispatches).toEqual(
      [closedGroup, openGroup].map(
        (group): ReservationCalendarDispatch => ({
          categoryId: group.category_id,
          categoryName: CALENDAR_CATEGORY.name,
          closedAt: group.closed_at,
          endsAt: group.ends_at,
          id: group.id,
          startsAt: group.dispatched_at,
        })
      )
    );
    expect(entry.startsAt).not.toBe(
      CALENDAR_DISPATCH.dispatched_at
    );
    expect(source).toEqual(original);
  });
});

describe("schedule failures", (): void => {
  it.each([
    null,
    CALENDAR_RESERVATION.starts_at,
    CALENDAR_DISPATCH.dispatched_at,
  ])(
    "rejects missing or reversed scheduled end %s",
    (endsAt): void => {
      const startsAt = CALENDAR_RESERVATION.ends_at;
      expect(() =>
        mapReservationCalendarEntry({
          ...CALENDAR_RESERVATION,
          starts_at:
            startsAt ?? CALENDAR_RESERVATION.starts_at,
          ends_at: endsAt,
        })
      ).toThrow(
        RESERVATION_CALENDAR_ERROR.INVALID_SCHEDULE
      );
    }
  );
});
