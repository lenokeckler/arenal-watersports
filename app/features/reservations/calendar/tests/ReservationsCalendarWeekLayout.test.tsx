import { describe, expect, it } from "vitest";
import { CALENDAR_VIEW } from "@/app/constants";
import {
  CALENDAR_DAY_CLASS,
  CALENDAR_WEEK_DAY_COLUMN_WIDTH_CLASS,
  CALENDAR_WEEK_DAYS_CLASS,
} from "@/app/components/calendar/styles/Calendar.styles";
import { RESERVATION_CALENDAR_BLOCK_DETAILS_CLASS } from "@/app/components/reservation-calendar/styles/ReservationCalendar.styles";
import { createCalendarWeekLayoutPage } from "@/app/components/calendar/tests/CalendarWeekLayout.page";
import { createReservationsCalendarPage } from "./ReservationsCalendar.page";
import { RESERVATIONS_CALENDAR_SELECTION as fixture } from "./ReservationsCalendarSelection.constants";
import {
  renderReservationsCalendar,
  setupReservationsCalendarTests,
} from "./reservationsCalendarTestSetup";

setupReservationsCalendarTests();

describe("Reservations calendar week layout", () => {
  it("keeps reservation details within a readable horizontal day card", async () => {
    renderReservationsCalendar(
      fixture.SNAPSHOT,
      fixture.OCTOBER_DATE
    );
    const reservationsPage =
      createReservationsCalendarPage();
    const calendarPage = createCalendarWeekLayoutPage();

    expect(
      reservationsPage.hasEquipmentImage(
        fixture.OCTOBER_CUSTOMER_NAME
      )
    ).toBe(true);

    await reservationsPage.selectView(CALENDAR_VIEW.WEEK);

    expect(
      calendarPage.getDayGridClassName(fixture.OCTOBER_DATE)
    ).toContain(CALENDAR_WEEK_DAYS_CLASS);
    expect(
      calendarPage.getDayGridClassName(fixture.OCTOBER_DATE)
    ).toContain(CALENDAR_WEEK_DAY_COLUMN_WIDTH_CLASS);
    expect(
      calendarPage.getDayCardClassName(fixture.OCTOBER_DATE)
    ).toContain(CALENDAR_DAY_CLASS);
    expect(
      reservationsPage.getReservationBlockDetailsClassName(
        fixture.OCTOBER_CUSTOMER_NAME
      )
    ).toContain(RESERVATION_CALENDAR_BLOCK_DETAILS_CLASS);
    expect(
      reservationsPage.hasEquipmentImage(
        fixture.OCTOBER_CUSTOMER_NAME
      )
    ).toBe(false);
  });
});
