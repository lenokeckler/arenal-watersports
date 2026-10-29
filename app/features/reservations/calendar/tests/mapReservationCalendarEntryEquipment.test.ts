import { describe, expect, it } from "vitest";
import { RESERVATION_CALENDAR_ERROR } from "../constants/ReservationCalendarProjection.constants";
import { mapReservationCalendarEntry } from "../utils/mapReservationCalendarEntry";
import {
  CALENDAR_CATEGORY,
  CALENDAR_RESERVATION,
  CALENDAR_UNIT_CODE,
  CATEGORY_COMMITMENT,
  EXTRA_COMMITMENT,
  UNIT_COMMITMENT,
} from "./ReservationCalendar.constants";

describe("equipment projection", (): void => {
  it("retains category and unit commitments while excluding a monetary extra", (): void => {
    const source = {
      ...CALENDAR_RESERVATION,
      reservation_items: [
        CATEGORY_COMMITMENT,
        EXTRA_COMMITMENT,
        UNIT_COMMITMENT,
      ],
    };

    const entry = mapReservationCalendarEntry(source);

    expect(entry.equipment).toEqual([
      {
        categoryId: CALENDAR_CATEGORY.id,
        categoryName: CALENDAR_CATEGORY.name,
        quantity: CATEGORY_COMMITMENT.quantity,
        unitCode: null,
      },
      {
        categoryId: CALENDAR_CATEGORY.id,
        categoryName: CALENDAR_CATEGORY.name,
        quantity: 1,
        unitCode: CALENDAR_UNIT_CODE,
      },
    ]);
  });
});

describe("equipment failures", (): void => {
  it("rejects a reservation with an incomplete equipment relation", (): void => {
    const source = {
      ...CALENDAR_RESERVATION,
      reservation_items: [
        { ...CATEGORY_COMMITMENT, category: null },
      ],
    };

    const project = () =>
      mapReservationCalendarEntry(source);

    expect(project).toThrow(
      RESERVATION_CALENDAR_ERROR.INVALID_EQUIPMENT
    );
  });
});
