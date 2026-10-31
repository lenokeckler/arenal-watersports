import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  CALENDAR_TEXT,
  PATHS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { CalendarView } from "@/app/types";
import { E2E_RESERVATIONS_CALENDAR_COPY } from "../constants/E2eReservationsCalendar.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationsCalendarPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getView = (view: CalendarView): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_RESERVATIONS_CALENDAR_COPY.VIEWS[view],
      exact: true,
    });

  return {
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: E2E_RESERVATIONS_CALENDAR_COPY.HEADING,
      }),
    getCreateReservationLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: RESERVATIONS_CALENDAR_COPY.CREATE_RESERVATION,
        exact: true,
      }),
    getView,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.RESERVATIONS.CALENDAR);
    },
    selectView: async (
      view: CalendarView
    ): Promise<void> => {
      await getView(view).click();
    },
    getPeriodContent: (): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name: CALENDAR_TEXT.PERIOD_CONTENT,
      }),
  };
};
