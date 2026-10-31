import { describe, expect, it } from "vitest";
import {
  CALENDAR_VIEW,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { calendarActions, store } from "@/app/store";
import {
  CALENDAR_HEAT_GREEN_CLASS,
  CALENDAR_HEAT_ORANGE_CLASS,
  CALENDAR_HEAT_RED_CLASS,
} from "@/app/components/calendar/styles/Calendar.styles";
import { createReservationsCalendarPage } from "./ReservationsCalendar.page";
import { RESERVATIONS_CALENDAR_SELECTION as fixture } from "./ReservationsCalendarSelection.constants";
import {
  renderReservationsCalendar,
  getAgendaScrollMock,
  setupReservationsCalendarTests,
} from "./reservationsCalendarTestSetup";

setupReservationsCalendarTests();

describe("Reservations calendar year selection", () => {
  it("shows a selected day before the full year agenda", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.SNAPSHOT);
    const page = createReservationsCalendarPage();
    await page.selectView(CALENDAR_VIEW.YEAR);

    expect(
      page.getDaySelection(fixture.OCTOBER_DATE)
    ).toHaveClass(CALENDAR_HEAT_GREEN_CLASS);
    await page.selectDay(fixture.OCTOBER_DATE);

    expect(page.getSelectedDayAgenda()).toBeVisible();
    expect(page.isSelectedDayAgendaBeforePeriod()).toBe(
      true
    );
    expect(
      page.getSelectedDayReservationBlocks()
    ).toHaveLength(1);
    expect(page.getPeriodReservationBlocks()).toHaveLength(
      5
    );
    expect(page.getReservationBlocks()).toHaveLength(6);
    expect(
      page.getDaySelection(fixture.OCTOBER_DATE)
    ).toHaveAttribute(fixture.PRESSED, fixture.TRUE);
    expect(
      page.getMonthSelection(fixture.OCTOBER_MONTH)
    ).toHaveAttribute(fixture.PRESSED, fixture.FALSE);
  });

  it("shows the selected month before retaining the complete year agenda", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.SNAPSHOT);
    const page = createReservationsCalendarPage();
    await page.selectView(CALENDAR_VIEW.YEAR);

    await page.selectMonth(fixture.OCTOBER_MONTH);

    expect(getAgendaScrollMock()).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
    expect(
      getAgendaScrollMock().mock.contexts[0]
    ).toHaveProperty(
      "id",
      RESERVATIONS_CALENDAR_COPY.SELECTED_MONTH_AGENDA_ID
    );
    expect(page.getSelectedDayAgenda()).toBeNull();
    expect(page.getSelectedMonthAgenda()).toBeVisible();
    expect(page.getPeriodAgenda()).toBeVisible();
    expect(page.isSelectedMonthAgendaBeforePeriod()).toBe(
      true
    );
    expect(
      page.getSelectedMonthReservationBlocks()
    ).toHaveLength(3);
    expect(page.getPeriodReservationBlocks()).toHaveLength(
      5
    );
    expect(page.getReservationBlocks()).toHaveLength(8);
    expect(
      page.getSelectedMonthReservationBlocks()[0]
    ).toHaveTextContent(fixture.OCTOBER_CUSTOMER_NAME);
    expect(
      page.getDaySelection(fixture.OCTOBER_DATE)
    ).toHaveAttribute(fixture.PRESSED, fixture.FALSE);
    expect(
      page.getMonthSelection(fixture.OCTOBER_MONTH)
    ).toHaveAttribute(fixture.PRESSED, fixture.TRUE);
  });

  it("keeps month selection free of aggregate heat", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.SNAPSHOT);
    const page = createReservationsCalendarPage();
    await page.selectView(CALENDAR_VIEW.YEAR);

    expect(page.getReservationBlocks()).toHaveLength(5);
    const monthSelectionClassName =
      page.getMonthSelectionCardClassName(
        fixture.OCTOBER_MONTH
      );
    expect(monthSelectionClassName).not.toContain(
      CALENDAR_HEAT_GREEN_CLASS
    );
    expect(monthSelectionClassName).not.toContain(
      CALENDAR_HEAT_ORANGE_CLASS
    );
    expect(monthSelectionClassName).not.toContain(
      CALENDAR_HEAT_RED_CLASS
    );
  });
});
