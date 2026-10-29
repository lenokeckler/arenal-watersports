import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_ERROR } from "@/app/components/reservation-calendar/constants/ReservationCalendarProjection.constants";
import { RESERVATION_CALENDAR_GUIDE_TYPE } from "@/app/constants";
import { mapReservationCalendarEntry } from "../utils/mapReservationCalendarEntry";
import {
  CALENDAR_EXTERNAL_GUIDE_NAME,
  CALENDAR_INTERNAL_GUIDE_NAME,
  CALENDAR_RESERVATION,
  EXTERNAL_CALENDAR_GUIDE,
  INTERNAL_CALENDAR_GUIDE,
} from "./ReservationCalendar.constants";

describe("reservation calendar guide mapping", (): void => {
  it("maps account and external guides with their full names", (): void => {
    const source = {
      ...CALENDAR_RESERVATION,
      reservation_guides: [
        INTERNAL_CALENDAR_GUIDE,
        EXTERNAL_CALENDAR_GUIDE,
      ],
    };
    const original = structuredClone(source);

    const entry = mapReservationCalendarEntry(source);

    expect(entry.guides).toEqual([
      {
        fullName: CALENDAR_INTERNAL_GUIDE_NAME,
        id: INTERNAL_CALENDAR_GUIDE.worker_id,
        type: RESERVATION_CALENDAR_GUIDE_TYPE.INTERNAL,
      },
      {
        fullName: CALENDAR_EXTERNAL_GUIDE_NAME,
        id: EXTERNAL_CALENDAR_GUIDE.worker_id,
        type: RESERVATION_CALENDAR_GUIDE_TYPE.EXTERNAL,
      },
    ]);
    expect(source).toEqual(original);
  });

  it("retains reservations with no assigned guides", (): void => {
    expect(
      mapReservationCalendarEntry(CALENDAR_RESERVATION)
        .guides
    ).toEqual([]);
  });

  it("retains an assignment with an unreadable worker", (): void => {
    const guide = {
      ...INTERNAL_CALENDAR_GUIDE,
      workers: null,
    };

    expect(
      mapReservationCalendarEntry({
        ...CALENDAR_RESERVATION,
        reservation_guides: [guide],
      }).guides
    ).toEqual([
      {
        id: guide.worker_id,
        type: RESERVATION_CALENDAR_GUIDE_TYPE.UNAVAILABLE,
      },
    ]);
  });

  it("preserves omitted guide assignment data as not loaded", (): void => {
    const source = { ...CALENDAR_RESERVATION };
    delete source.reservation_guides;

    expect(
      mapReservationCalendarEntry(source).guides
    ).toBeUndefined();
  });

  it("rejects a guide without a full name", (): void => {
    const guide = {
      ...INTERNAL_CALENDAR_GUIDE,
      workers: {
        full_name: " ",
        is_external_guide: false,
      },
    };

    expect(() =>
      mapReservationCalendarEntry({
        ...CALENDAR_RESERVATION,
        reservation_guides: [guide],
      })
    ).toThrow(RESERVATION_CALENDAR_ERROR.INVALID_GUIDE);
  });
});
