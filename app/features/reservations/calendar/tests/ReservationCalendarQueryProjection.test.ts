import { describe, expect, it } from "vitest";
import type { ReservationCalendarSource } from "../models/ReservationCalendarSource.interface";
import { mapReservationCalendarEntry } from "../utils/mapReservationCalendarEntry";
import {
  CALENDAR_UNIT_CODE,
  CATEGORY_COMMITMENT,
} from "./ReservationCalendar.constants";
import { CALENDAR_QUERY_ROW } from "./ReservationCalendarQueryProjection.constants";

describe("SDK calendar projection compatibility", (): void => {
  it("maps SDK-derived equipment and departure fields without a cast", (): void => {
    const source: ReservationCalendarSource =
      CALENDAR_QUERY_ROW;
    const entry = mapReservationCalendarEntry(source);
    expect(entry.customerName).toBe(source.customer_name);
    expect(entry.equipment).toHaveLength(2);
    expect(entry.equipment).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          quantity: CATEGORY_COMMITMENT.quantity,
          unitCode: null,
        }),
        expect.objectContaining({
          quantity: 1,
          unitCode: CALENDAR_UNIT_CODE,
        }),
      ])
    );
    expect(entry.dispatches).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          closedAt: null,
          endsAt: null,
        }),
      ])
    );
  });
});
