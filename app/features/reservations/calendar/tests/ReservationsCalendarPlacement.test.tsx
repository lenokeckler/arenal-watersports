import { describe, expect, it } from "vitest";
import { CALENDAR_VIEW } from "@/app/constants";
import { calendarActions, store } from "@/app/store";
import { createReservationsCalendarPage } from "./ReservationsCalendar.page";
import {
  RESERVATION_BLOCK_CONTAINER_CLASS,
  RESERVATIONS_CALENDAR_CONTENT_FIXTURE,
} from "./ReservationsCalendarContent.constants";
import {
  renderReservationsCalendar,
  setupReservationsCalendarTests,
} from "./reservationsCalendarTestSetup";

setupReservationsCalendarTests();

describe("ReservationsCalendar placement", () => {
  it.each(Object.values(CALENDAR_VIEW))(
    "places each reservation once in the %s view",
    async (view) => {
      store.dispatch(
        calendarActions.setAnchor(
          RESERVATIONS_CALENDAR_CONTENT_FIXTURE.date
        )
      );
      renderReservationsCalendar(
        RESERVATIONS_CALENDAR_CONTENT_FIXTURE.snapshot
      );
      const page = createReservationsCalendarPage();
      await page.selectView(view);

      expect(page.getReservationBlocks()).toHaveLength(1);
      expect(
        page.getReservationBlockContainerClasses()
      ).toEqual([RESERVATION_BLOCK_CONTAINER_CLASS[view]]);
    }
  );

  it.each([CALENDAR_VIEW.MONTH, CALENDAR_VIEW.YEAR])(
    "renders one agenda after the %s calendar grid",
    async (view) => {
      store.dispatch(
        calendarActions.setAnchor(
          RESERVATIONS_CALENDAR_CONTENT_FIXTURE.date
        )
      );
      renderReservationsCalendar(
        RESERVATIONS_CALENDAR_CONTENT_FIXTURE.snapshot
      );
      const page = createReservationsCalendarPage();
      await page.selectView(view);

      expect(page.getPeriodAgenda()).toBeVisible();
      expect(page.isPeriodAgendaAfterGrid()).toBe(true);
    }
  );
});
