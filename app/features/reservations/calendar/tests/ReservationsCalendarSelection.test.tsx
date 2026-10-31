import { describe, expect, it } from "vitest";
import {
  CALENDAR_VIEW,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import { calendarActions, store } from "@/app/store";
import { CALENDAR_HEAT_GREEN_CLASS } from "@/app/components/calendar/styles/Calendar.styles";
import { createReservationsCalendarPage } from "./ReservationsCalendar.page";
import { RESERVATIONS_CALENDAR_SELECTION as fixture } from "./ReservationsCalendarSelection.constants";
import {
  renderReservationsCalendar,
  getAgendaScrollMock,
  setupReservationsCalendarTests,
} from "./reservationsCalendarTestSetup";

setupReservationsCalendarTests();

describe("Reservations calendar month selection", () => {
  it("shows the selected day before the complete month agenda", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.SNAPSHOT);
    const page = createReservationsCalendarPage();
    await page.selectView(CALENDAR_VIEW.MONTH);

    expect(page.getReservationBlocks()).toHaveLength(3);
    expect(
      page.getDaySelection(fixture.OCTOBER_DATE)
    ).toHaveClass(CALENDAR_HEAT_GREEN_CLASS);

    await page.selectDay(fixture.OCTOBER_DATE);

    expect(getAgendaScrollMock()).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
    expect(
      getAgendaScrollMock().mock.contexts[0]
    ).toHaveProperty(
      "id",
      RESERVATIONS_CALENDAR_COPY.SELECTED_DAY_AGENDA_ID
    );
    expect(page.getSelectedDayAgenda()).toBeVisible();
    expect(page.getPeriodAgenda()).toBeVisible();
    expect(page.isSelectedDayAgendaBeforePeriod()).toBe(
      true
    );
    expect(
      page.getSelectedDayReservationBlocks()
    ).toHaveLength(1);
    expect(page.getPeriodReservationBlocks()).toHaveLength(
      3
    );
    expect(page.getReservationBlocks()).toHaveLength(4);
    expect(
      page.getSelectedDayReservationBlocks()[0]
    ).toHaveTextContent(fixture.OCTOBER_CUSTOMER_NAME);
    expect(
      page.getDaySelection(fixture.OCTOBER_DATE)
    ).toHaveAttribute(fixture.PRESSED, fixture.TRUE);
  });

  it("navigates to a selected adjacent-month date", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.SNAPSHOT);
    const page = createReservationsCalendarPage();
    await page.selectView(CALENDAR_VIEW.MONTH);

    await page.selectDay(fixture.PADDED_NOVEMBER_DATE);

    expect(store.getState().calendar.anchor).toEqual(
      fixture.PADDED_NOVEMBER_DATE
    );
    expect(
      page.getSelectedDayReservationBlocks()
    ).toHaveLength(1);
    expect(page.getPeriodReservationBlocks()).toHaveLength(
      2
    );
    expect(page.getReservationBlocks()).toHaveLength(3);
    expect(
      page.getSelectedDayReservationBlocks()[0]
    ).toHaveTextContent(
      fixture.PADDED_NOVEMBER_CUSTOMER_NAME
    );
    expect(
      page.getDaySelection(fixture.PADDED_NOVEMBER_DATE)
    ).toHaveAttribute(fixture.PRESSED, fixture.TRUE);
  });
});

describe("Reservations calendar empty selected day", () => {
  it("shows an empty selected day before the complete month agenda", async () => {
    store.dispatch(
      calendarActions.setAnchor(fixture.OCTOBER_DATE)
    );
    renderReservationsCalendar(fixture.SNAPSHOT);
    const page = createReservationsCalendarPage();
    await page.selectView(CALENDAR_VIEW.MONTH);

    await page.selectDay(fixture.EMPTY_OCTOBER_DATE);

    expect(page.getSelectedDayAgenda()).toBeVisible();
    expect(page.isSelectedDayAgendaBeforePeriod()).toBe(
      true
    );
    expect(
      page.getAgendaMessage(
        RESERVATIONS_CALENDAR_COPY.SELECTED_DAY_AGENDA,
        RESERVATIONS_CALENDAR_COPY.EMPTY_DAY
      )
    ).toBeVisible();
    expect(
      page.getSelectedDayReservationBlocks()
    ).toHaveLength(0);
    expect(page.getPeriodReservationBlocks()).toHaveLength(
      3
    );
  });
});
