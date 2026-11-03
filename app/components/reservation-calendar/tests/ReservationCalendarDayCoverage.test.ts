import { describe, expect, it } from "vitest";
import { RESERVATIONS_CALENDAR_COPY as copy } from "@/app/constants";
import { CALENDAR_DAY_COVERAGE_CASES } from "./ReservationCalendarDayCases.constants";
import { createReservationCalendarDayPage } from "./ReservationCalendarDay.page";
import { renderReservationCalendarDay } from "./renderReservationCalendarDay";
import {
  CALENDAR_DAY_INCOMPLETE,
  CALENDAR_DAY_SNAPSHOT,
} from "./ReservationCalendarDay.constants";

describe("Reservation calendar daily coverage", () => {
  it.each(CALENDAR_DAY_COVERAGE_CASES)(
    "explains $name when enabled",
    ({ snapshot, message }) => {
      renderReservationCalendarDay(snapshot, true);
      const page = createReservationCalendarDayPage();

      expect(page.getMessage(message)).toBeVisible();
      if (message !== copy.EMPTY_PERIOD) {
        expect(
          page.getMessage(copy.EMPTY_PERIOD)
        ).toBeNull();
      }
    }
  );
});

describe("Reservation calendar loaded daily blocks", () => {
  it("keeps loaded blocks visible beside incomplete results", () => {
    renderReservationCalendarDay(
      CALENDAR_DAY_INCOMPLETE,
      true
    );
    const page = createReservationCalendarDayPage();

    expect(page.getCustomer()).toBeVisible();
    expect(
      page.getMessage(copy.INCOMPLETE_RESULTS)
    ).toBeVisible();
  });

  it("renders complete content without coverage messages", () => {
    renderReservationCalendarDay(
      CALENDAR_DAY_SNAPSHOT,
      true
    );
    const page = createReservationCalendarDayPage();

    expect(page.getCustomer()).toBeVisible();
    CALENDAR_DAY_COVERAGE_CASES.forEach(({ message }) => {
      expect(page.getMessage(message)).toBeNull();
    });
  });
});
