import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_QUERY_ERROR } from "@/app/constants";
import { buildReservationCalendarQuery } from "../buildReservationCalendarQuery";
import { validateReservationCalendarWindow } from "../utils/validateReservationCalendarWindow";
import { normalizeReservationCalendarInstant } from "../utils/normalizeReservationCalendarInstant";
import { createReservationCalendarQueryHarness } from "./createReservationCalendarQueryHarness";
import {
  INVALID_CANONICAL_QUERY_INSTANTS,
  INVALID_QUERY_INSTANTS,
  INVALID_QUERY_ENDS,
  INVALID_QUERY_PAGES,
  MAXIMUM_QUERY_PAGE,
  OFFSET_QUERY_WINDOW,
  QUERY_WINDOW,
  VALID_QUERY_INSTANTS,
} from "./ReservationCalendarQuery.constants";

describe("query window normalization", (): void => {
  it("normalizes zoned instants without modifying the caller's window", (): void => {
    const original = structuredClone(OFFSET_QUERY_WINDOW);
    expect(
      validateReservationCalendarWindow(OFFSET_QUERY_WINDOW)
    ).toEqual(QUERY_WINDOW);
    expect(OFFSET_QUERY_WINDOW).toEqual(original);
  });
  it.each(INVALID_QUERY_ENDS)(
    "rejects equal and reversed windows ending at %s",
    (endsAt): void => {
      expect(() =>
        validateReservationCalendarWindow({
          ...QUERY_WINDOW,
          endsAt,
        })
      ).toThrow(
        RESERVATION_CALENDAR_QUERY_ERROR.INVALID_WINDOW
      );
    }
  );
});

describe("invalid query instants", (): void => {
  it.each(INVALID_QUERY_INSTANTS)(
    "rejects malformed or impossible instant %s before a request",
    (startsAt): void => {
      const harness =
        createReservationCalendarQueryHarness();
      expect(() =>
        buildReservationCalendarQuery(harness.client, {
          ...QUERY_WINDOW,
          startsAt,
        })
      ).toThrow(
        RESERVATION_CALENDAR_QUERY_ERROR.INVALID_WINDOW
      );
      expect(harness.fetchRequest).not.toHaveBeenCalled();
    }
  );
});

describe("valid query boundaries", (): void => {
  it.each(VALID_QUERY_INSTANTS)(
    "normalizes %s without losing supported precision",
    (instant, expected): void => {
      expect(
        normalizeReservationCalendarInstant(instant)
      ).toBe(expected);
    }
  );
  it("accepts the largest page whose complete inclusive range remains safe", (): void => {
    const window = {
      ...QUERY_WINDOW,
      page: MAXIMUM_QUERY_PAGE,
    };
    expect(
      validateReservationCalendarWindow(window)
    ).toEqual(window);
  });
});

describe("invalid query end instants", (): void => {
  it.each(INVALID_QUERY_INSTANTS)(
    "rejects malformed or impossible end %s before a request",
    (endsAt): void => {
      const harness =
        createReservationCalendarQueryHarness();

      const build = () =>
        buildReservationCalendarQuery(harness.client, {
          ...QUERY_WINDOW,
          endsAt,
        });

      expect(build).toThrow(
        RESERVATION_CALENDAR_QUERY_ERROR.INVALID_WINDOW
      );
      expect(harness.fetchRequest).not.toHaveBeenCalled();
    }
  );
});

describe("canonical query format boundaries", (): void => {
  it.each(INVALID_CANONICAL_QUERY_INSTANTS)(
    "rejects %s when UTC normalization expands the year",
    (instant): void => {
      const normalize = () =>
        normalizeReservationCalendarInstant(instant);

      expect(normalize).toThrow(
        RESERVATION_CALENDAR_QUERY_ERROR.INVALID_WINDOW
      );
    }
  );
});

describe("unsafe parent query ranges", (): void => {
  it.each(INVALID_QUERY_PAGES)(
    "rejects invalid page or unsafe inclusive range %s before a request",
    (page): void => {
      const harness =
        createReservationCalendarQueryHarness();
      expect(() =>
        buildReservationCalendarQuery(harness.client, {
          ...QUERY_WINDOW,
          page,
        })
      ).toThrow(
        RESERVATION_CALENDAR_QUERY_ERROR.INVALID_PAGE
      );
      expect(harness.fetchRequest).not.toHaveBeenCalled();
    }
  );
});
