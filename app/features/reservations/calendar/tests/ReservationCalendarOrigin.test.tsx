import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import {
  RESERVATIONS_CALENDAR_COPY as copy,
  STRING,
} from "@/app/constants";
import { ReservationCalendarBlock } from "@/app/components/reservation-calendar/components/ReservationCalendarBlock";
import { buildReservationCalendarBlock } from "@/app/components/reservation-calendar/utils/buildReservationCalendarBlock";
import { mapReservationCalendarEntry } from "../utils/mapReservationCalendarEntry";
import { createReservationCalendarBlockPage } from "./ReservationCalendarBlock.page";
import { CALENDAR_RESERVATION } from "./ReservationCalendar.constants";
import { CALENDAR_BLOCK_ENTRY } from "./ReservationCalendarDisplay.constants";

const ORIGIN_CODE = "R-000123";
const ORIGIN_LABEL = [copy.ORIGIN, ORIGIN_CODE].join(
  STRING.SPACE
);

afterEach(cleanup);

describe("reservation origin on the calendar", (): void => {
  it("maps the code of the reservation a departure came from", (): void => {
    const entry = mapReservationCalendarEntry({
      ...CALENDAR_RESERVATION,
      parent: { code: ORIGIN_CODE },
    });

    expect(entry.parentCode).toBe(ORIGIN_CODE);
  });

  it("maps a reservation without origin as having none", (): void => {
    const entry = mapReservationCalendarEntry({
      ...CALENDAR_RESERVATION,
      parent: null,
    });

    expect(entry.parentCode).toBeUndefined();
  });

  it("keeps the status and has no origin label on an original", (): void => {
    const block = buildReservationCalendarBlock(
      CALENDAR_BLOCK_ENTRY
    );

    expect(block.status).toBe(CALENDAR_BLOCK_ENTRY.status);
    expect(block.originLabel).toBeUndefined();
  });

  it("shows the origin in the block and in its accessible label", (): void => {
    const block = buildReservationCalendarBlock({
      ...CALENDAR_BLOCK_ENTRY,
      parentCode: ORIGIN_CODE,
    });

    render(<ReservationCalendarBlock block={block} />);
    const page = createReservationCalendarBlockPage(block);

    expect(block.accessibleLabel).toContain(ORIGIN_LABEL);
    expect(page.getText(ORIGIN_LABEL)).toBeVisible();
  });
});
