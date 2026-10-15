import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_EXCLUDED_STATUS as excluded } from "../constants/ReservationCalendarExcludedStatus.constants";
import { reservationIntersectsCalendarDay } from "../utils/reservationIntersectsCalendarDay";
import {
  ACTUAL_DAY_CASES,
  COVERAGE_DAY,
  COVERAGE_INSTANT,
  COVERAGE_NEXT_DAY,
  SCHEDULED_DAY_CASES,
} from "./ReservationCalendarCoverage.constants";
import { CALENDAR_BLOCK_ENTRY } from "./ReservationCalendarDisplay.constants";
import { INVALID_CALENDAR_INSTANTS } from "./ReservationCalendar.constants";

describe("booked presence on Costa Rica civil days", (): void => {
  it.each(SCHEDULED_DAY_CASES)(
    "classifies booked interval %s to %s as %s",
    (startsAt, endsAt, expected): void => {
      const entry = {
        ...CALENDAR_BLOCK_ENTRY,
        dispatches: [],
        startsAt,
        endsAt,
      };
      expect(
        reservationIntersectsCalendarDay(
          entry,
          COVERAGE_DAY
        )
      ).toBe(expected);
    }
  );
});

describe("actual departure group presence", (): void => {
  it.each(ACTUAL_DAY_CASES)(
    "classifies departure %s closure %s expected %s as %s",
    (startsAt, closedAt, endsAt, expected): void => {
      const dispatch = {
        ...CALENDAR_BLOCK_ENTRY.dispatches[0],
        startsAt,
        closedAt,
        endsAt,
      };
      const entry = {
        ...CALENDAR_BLOCK_ENTRY,
        dispatches: [dispatch],
      };
      expect(
        reservationIntersectsCalendarDay(
          entry,
          COVERAGE_NEXT_DAY
        )
      ).toBe(expected);
    }
  );
  it("preserves supplied reservation and group facts", (): void => {
    const original = structuredClone(CALENDAR_BLOCK_ENTRY);
    reservationIntersectsCalendarDay(
      CALENDAR_BLOCK_ENTRY,
      COVERAGE_NEXT_DAY
    );
    expect(CALENDAR_BLOCK_ENTRY).toEqual(original);
  });
});

describe("calendar lifecycle filtering", (): void => {
  it.each(Object.values(excluded))(
    "excludes %s even when the booking overlaps",
    (status): void => {
      expect(
        reservationIntersectsCalendarDay(
          { ...CALENDAR_BLOCK_ENTRY, status },
          COVERAGE_DAY
        )
      ).toBe(false);
    }
  );
});

describe("independent actual departure groups", (): void => {
  it("includes a later matching group when the first group has returned", (): void => {
    const [closedGroup, openGroup] =
      CALENDAR_BLOCK_ENTRY.dispatches;
    const entry = {
      ...CALENDAR_BLOCK_ENTRY,
      startsAt: COVERAGE_INSTANT.BEFORE_DAY,
      endsAt: COVERAGE_INSTANT.DAY_START,
      dispatches: [
        closedGroup,
        {
          ...openGroup,
          startsAt: COVERAGE_INSTANT.NEXT_DAY_INSIDE,
        },
      ],
    };

    const result = reservationIntersectsCalendarDay(
      entry,
      COVERAGE_NEXT_DAY
    );

    expect(result).toBe(true);
  });
});

describe("invalid calendar reservation instants", (): void => {
  it.each(INVALID_CALENDAR_INSTANTS)(
    "rejects invalid scheduled start %s",
    (startsAt): void => {
      expect(() =>
        reservationIntersectsCalendarDay(
          { ...CALENDAR_BLOCK_ENTRY, startsAt },
          COVERAGE_DAY
        )
      ).toThrow();
    }
  );
});
