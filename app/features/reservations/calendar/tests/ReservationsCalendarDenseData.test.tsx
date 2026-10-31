import { describe, expect, it } from "vitest";
import { CALENDAR_VIEW } from "@/app/constants";
import { calendarActions, store } from "@/app/store";
import { CALENDAR_HEAT_RED_CLASS } from "@/app/components/calendar/styles/Calendar.styles";
import { createReservationsCalendarPage } from "./ReservationsCalendar.page";
import { RESERVATIONS_CALENDAR_SELECTION as fixture } from "./ReservationsCalendarSelection.constants";
import {
  renderReservationsCalendar,
  setupReservationsCalendarTests,
} from "./reservationsCalendarTestSetup";

setupReservationsCalendarTests();

describe("Reservations calendar with a busy day", () => {
  it("renders all reservations in the selected day view", () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.BUSY_DAY_SNAPSHOT);
    const page = createReservationsCalendarPage();

    expect(page.getReservationBlocks()).toHaveLength(
      fixture.BUSY_DAY_EXPECTED_COUNTS.DAY
    );
  });

  it("keeps busy reservations readable in the week view", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.BUSY_DAY_SNAPSHOT);
    const page = createReservationsCalendarPage();

    await page.selectView(CALENDAR_VIEW.WEEK);

    expect(page.getReservationBlocks()).toHaveLength(
      fixture.BUSY_DAY_EXPECTED_COUNTS.WEEK
    );
  });

  it("shows a busy selected day and its full month agenda", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.BUSY_DAY_SNAPSHOT);
    const page = createReservationsCalendarPage();

    await page.selectView(CALENDAR_VIEW.MONTH);
    expect(
      page.getDaySelection(fixture.OCTOBER_DATE)
    ).toHaveClass(CALENDAR_HEAT_RED_CLASS);
    await page.selectDay(fixture.OCTOBER_DATE);

    expect(page.getSelectedDayAgenda()).toBeVisible();
    expect(page.getPeriodAgenda()).toBeVisible();
    expect(page.isSelectedDayAgendaBeforePeriod()).toBe(
      true
    );
    expect(
      page.getSelectedDayReservationBlocks()
    ).toHaveLength(fixture.BUSY_DAY_EXPECTED_COUNTS.DAY);
    expect(page.getPeriodReservationBlocks()).toHaveLength(
      fixture.BUSY_DAY_EXPECTED_COUNTS.MONTH
    );
    expect(page.getReservationBlocks()).toHaveLength(
      fixture.BUSY_DAY_EXPECTED_COUNTS
        .SELECTED_DAY_AND_MONTH
    );
  });

  it("shows a busy month while preserving the full year agenda", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.BUSY_DAY_SNAPSHOT);
    const page = createReservationsCalendarPage();

    await page.selectView(CALENDAR_VIEW.YEAR);
    await page.selectMonth(fixture.OCTOBER_MONTH);

    expect(page.getSelectedMonthAgenda()).toBeVisible();
    expect(page.getPeriodAgenda()).toBeVisible();
    expect(page.isSelectedMonthAgendaBeforePeriod()).toBe(
      true
    );
    expect(
      page.getSelectedMonthReservationBlocks()
    ).toHaveLength(fixture.BUSY_DAY_EXPECTED_COUNTS.MONTH);
    expect(page.getPeriodReservationBlocks()).toHaveLength(
      fixture.BUSY_DAY_EXPECTED_COUNTS.YEAR
    );
    expect(page.getReservationBlocks()).toHaveLength(
      fixture.BUSY_DAY_EXPECTED_COUNTS
        .SELECTED_MONTH_AND_YEAR
    );
  });
});
