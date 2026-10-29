import { describe, expect, it } from "vitest";
import { CALENDAR_DATE_ERROR } from "@/app/constants";
import { RESERVATION_CALENDAR_COVERAGE_ERROR as error } from "../constants/ReservationCalendarCoverage.constants";
import { validateReservationCalendarSnapshot } from "../utils/validateReservationCalendarSnapshot";
import {
  COVERAGE_DAY,
  COVERAGE_SNAPSHOT,
  INVALID_COVERAGE_COUNTS,
  INVALID_COVERAGE_DATES,
} from "./ReservationCalendarCoverage.constants";

describe("valid supplied calendar coverage", (): void => {
  it("accepts a partial page without mutating its snapshot", (): void => {
    const snapshot = {
      ...COVERAGE_SNAPSHOT,
      totalCount: Number.MAX_SAFE_INTEGER,
    };
    const original = structuredClone(snapshot);
    expect(() =>
      validateReservationCalendarSnapshot(snapshot)
    ).not.toThrow();
    expect(snapshot).toEqual(original);
  });
  it("accepts complete empty coverage", (): void => {
    expect(() =>
      validateReservationCalendarSnapshot({
        ...COVERAGE_SNAPSHOT,
        entries: [],
        totalCount: 0,
      })
    ).not.toThrow();
  });
});

describe("invalid civil calendar coverage", (): void => {
  it.each(INVALID_COVERAGE_DATES)(
    "rejects unsupported civil boundary %j",
    (date): void => {
      expect(() =>
        validateReservationCalendarSnapshot({
          ...COVERAGE_SNAPSHOT,
          startDate: date,
        })
      ).toThrow(CALENDAR_DATE_ERROR.INVALID_DATE);
      expect(() =>
        validateReservationCalendarSnapshot({
          ...COVERAGE_SNAPSHOT,
          endDateExclusive: date,
        })
      ).toThrow(CALENDAR_DATE_ERROR.INVALID_DATE);
    }
  );
  it.each([
    COVERAGE_DAY,
    { ...COVERAGE_DAY, day: COVERAGE_DAY.day - 1 },
  ])(
    "rejects empty or reversed coverage ending on %j",
    (endDateExclusive): void => {
      expect(() =>
        validateReservationCalendarSnapshot({
          ...COVERAGE_SNAPSHOT,
          endDateExclusive,
        })
      ).toThrow(error.INVALID_COVERAGE);
    }
  );
});

describe("invalid calendar snapshot membership", (): void => {
  it.each(INVALID_COVERAGE_COUNTS)(
    "rejects unsafe, invalid or underreported total %s",
    (totalCount): void => {
      expect(() =>
        validateReservationCalendarSnapshot({
          ...COVERAGE_SNAPSHOT,
          totalCount,
        })
      ).toThrow(error.INVALID_COUNT);
    }
  );
  it("rejects duplicate parent reservation ids", (): void => {
    const entries = [
      ...COVERAGE_SNAPSHOT.entries,
      ...COVERAGE_SNAPSHOT.entries,
    ];
    expect(() =>
      validateReservationCalendarSnapshot({
        ...COVERAGE_SNAPSHOT,
        entries,
        totalCount: entries.length,
      })
    ).toThrow(error.DUPLICATE_RESERVATION);
  });
});
