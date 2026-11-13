import { describe, expect, it } from "vitest";
import { CALENDAR_VIEW } from "@/app/constants";
import { buildCalendarPeriod } from "@/app/components/calendar/utils";
import { buildReservationCalendarContent } from "@/app/components/reservation-calendar/utils/buildReservationCalendarContent";
import { paginateReservationCalendarAgenda } from "../utils/paginateReservationCalendarAgenda";
import { RESERVATIONS_CALENDAR_SELECTION as fixture } from "./ReservationsCalendarSelection.constants";

const octoberPeriod = buildCalendarPeriod(
  fixture.OCTOBER_DATE,
  CALENDAR_VIEW.MONTH
);

describe("paginateReservationCalendarAgenda", () => {
  it("limits unique reservations while retaining their date groups", () => {
    const content = buildReservationCalendarContent(
      fixture.SNAPSHOT,
      octoberPeriod
    );

    const page = paginateReservationCalendarAgenda(
      content,
      2,
      2
    );

    expect(page.page).toBe(2);
    expect(page.pageCount).toBe(2);
    expect(page.totalCount).toBe(3);
    expect(
      page.groups.flatMap(({ blocks }) => blocks)
    ).toHaveLength(1);
  });

  it("counts a reservation once when it appears across several dates", () => {
    const content = buildReservationCalendarContent(
      fixture.MULTIDAY_SNAPSHOT,
      octoberPeriod
    );

    const page = paginateReservationCalendarAgenda(
      content,
      1,
      2
    );

    expect(page.totalCount).toBe(1);
    expect(page.pageCount).toBe(1);
    expect(page.groups.length).toBeGreaterThan(1);
    expect(
      new Set(
        page.groups.flatMap(({ blocks }) =>
          blocks.map(({ id }) => id)
        )
      )
    ).toEqual(
      new Set([fixture.MULTIDAY_SNAPSHOT.entries[0].id])
    );
  });

  it("clamps the requested page when the period has fewer reservations", () => {
    const content = buildReservationCalendarContent(
      fixture.SNAPSHOT,
      octoberPeriod
    );

    const page = paginateReservationCalendarAgenda(
      content,
      8,
      2
    );

    expect(page.page).toBe(page.pageCount);
  });
});
