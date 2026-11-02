import { describe, expect, it } from "vitest";
import { RESERVATIONS_CALENDAR_COPY as copy } from "@/app/constants";
import { buildReservationCalendarBlock } from "@/app/components/reservation-calendar/utils/buildReservationCalendarBlock";
import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import { INVALID_CALENDAR_INSTANTS } from "./ReservationCalendar.constants";
import {
  CALENDAR_BLOCK_ENTRY as entry,
  CALENDAR_BLOCK_EXPECTED as expected,
  CALENDAR_BLOCK_INSTANT as instant,
} from "./ReservationCalendarDisplay.constants";

describe("complete reservation information", (): void => {
  it("retains full customer, quantity equipment and actual unit code without mutation", (): void => {
    const original = structuredClone(entry);
    const block = buildReservationCalendarBlock(entry);
    expect(block.customerName).toBe(entry.customerName);
    expect(block.id).toBe(entry.id);
    expect(block.status).toBe(entry.status);
    expect(block.equipmentLabel).toBe(expected.EQUIPMENT);
    expect(block.scheduledLabel).toBe(expected.SCHEDULED);
    expect(entry).toEqual(original);
  });
  it("keeps a reservation with explicit missing-equipment information", (): void => {
    const block = buildReservationCalendarBlock({
      ...entry,
      equipment: [],
    });
    expect(block.equipmentLabel).toBe(
      copy.MISSING_EQUIPMENT
    );
    expect(block.customerName).toBe(entry.customerName);
  });
});

describe("actual and scheduled information", (): void => {
  it("preserves category groups and distinguishes departure, expected return and actual return", (): void => {
    const block = buildReservationCalendarBlock(entry);
    expect(block.actualLabels).toEqual(
      expected.ACTUAL_LABELS
    );
    expect(block.scheduledLabel).toBe(expected.SCHEDULED);
  });
  it("does not invent an expected or actual return for an open group", (): void => {
    const block = buildReservationCalendarBlock(entry);
    expect(block.actualLabels).toEqual(
      expect.arrayContaining([
        expect.stringContaining(
          copy.UNKNOWN_EXPECTED_RETURN
        ),
        expect.stringContaining(copy.UNKNOWN_RETURN),
      ])
    );
    expect(
      buildReservationCalendarBlock({
        ...entry,
        dispatches: [],
      }).actualLabels
    ).toEqual([]);
  });
});

describe("static accessible descriptions", (): void => {
  it("includes the same complete customer, equipment and every time label", (): void => {
    const block = buildReservationCalendarBlock(entry);
    for (const value of [
      block.customerName,
      block.equipmentLabel,
      block.scheduledLabel,
      ...block.actualLabels,
    ]) {
      expect(block.accessibleLabel).toContain(value);
    }
  });
});

describe("Costa Rica date continuity", (): void => {
  it("retains original full dates across a multi-day reservation", (): void => {
    const block = buildReservationCalendarBlock({
      ...entry,
      startsAt: instant.BEFORE_MIDNIGHT,
      endsAt: instant.NEXT_DAY,
    });
    expect(block.scheduledLabel).toContain(
      expected.BEFORE_MIDNIGHT
    );
    expect(block.scheduledLabel).toContain(
      expected.NEXT_DAY
    );
  });
  it("formats Costa Rica midnight with its correct full civil date", (): void => {
    expect(
      formatReservationCalendarDateTime(instant.MIDNIGHT)
    ).toBe(expected.MIDNIGHT);
  });
  it.each(INVALID_CALENDAR_INSTANTS)(
    "rejects invalid display instant %s",
    (value): void => {
      expect(() =>
        formatReservationCalendarDateTime(value)
      ).toThrow();
    }
  );
});
