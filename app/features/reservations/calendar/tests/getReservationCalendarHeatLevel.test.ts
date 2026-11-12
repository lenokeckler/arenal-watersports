import { describe, expect, it } from "vitest";
import { getReservationCalendarHeatLevel } from "../utils/getReservationCalendarHeatLevel";
import { RESERVATION_CALENDAR_HEAT_LEVEL_CASES as cases } from "./ReservationCalendarHeatLevel.constants";

describe("getReservationCalendarHeatLevel", () => {
  it.each(cases)(
    "maps $count reservations to $level",
    ({ count, level }) => {
      expect(getReservationCalendarHeatLevel(count)).toBe(
        level
      );
    }
  );
});
