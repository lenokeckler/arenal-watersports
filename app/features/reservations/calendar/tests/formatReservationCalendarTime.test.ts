import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_ERROR } from "../constants/ReservationCalendarProjection.constants";
import { formatReservationCalendarTime } from "../utils/formatReservationCalendarTime";
import { parseReservationCalendarInstant } from "../utils/parseReservationCalendarInstant";
import {
  CALENDAR_TIME_CASES,
  INVALID_CALENDAR_INSTANTS,
} from "./ReservationCalendar.constants";

describe("calendar Costa Rica reservation times", () => {
  it.each(CALENDAR_TIME_CASES)(
    "formats %s as Costa Rica time %s",
    (instant, expected): void => {
      expect(formatReservationCalendarTime(instant)).toBe(
        expected
      );
    }
  );

  it.each(INVALID_CALENDAR_INSTANTS)(
    "rejects invalid or timezone-free instant %s",
    (instant): void => {
      expect(() =>
        parseReservationCalendarInstant(instant)
      ).toThrow(RESERVATION_CALENDAR_ERROR.INVALID_INSTANT);
      expect(() =>
        formatReservationCalendarTime(instant)
      ).toThrow(RESERVATION_CALENDAR_ERROR.INVALID_INSTANT);
    }
  );
});
