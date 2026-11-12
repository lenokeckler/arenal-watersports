import { describe, expect, it } from "vitest";
import { buildReservationCalendarBlock } from "@/app/components/reservation-calendar/utils/buildReservationCalendarBlock";
import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import {
  CALENDAR_BLOCK_CLOSED_DISPATCH as dispatch,
  CALENDAR_BLOCK_ENTRY as entry,
  CALENDAR_BLOCK_EXPECTED as expected,
  CALENDAR_BLOCK_MIDNIGHT_OFFSETS,
} from "./ReservationCalendarDisplay.constants";

describe("independent reservation return information", (): void => {
  it("retains a known expected return when no actual return is recorded", (): void => {
    const source = {
      ...entry,
      dispatches: [{ ...dispatch, closedAt: null }],
    };

    const block = buildReservationCalendarBlock(source);

    expect(block.actualLabels).toEqual([
      expected.MISSING_ACTUAL_RETURN,
    ]);
  });

  it("retains an actual return when the expected return is unknown", (): void => {
    const source = {
      ...entry,
      dispatches: [{ ...dispatch, endsAt: null }],
    };

    const block = buildReservationCalendarBlock(source);

    expect(block.actualLabels).toEqual([
      expected.MISSING_EXPECTED_RETURN,
    ]);
  });
});

describe("equivalent zoned reservation dates", (): void => {
  it.each(CALENDAR_BLOCK_MIDNIGHT_OFFSETS)(
    "formats %s with the same Costa Rica date and time",
    (instant): void => {
      const label =
        formatReservationCalendarDateTime(instant);

      expect(label).toBe(expected.MIDNIGHT);
    }
  );
});
