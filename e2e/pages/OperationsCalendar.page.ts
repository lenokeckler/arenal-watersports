import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import type { CalendarView } from "@/app/types";
import { E2E_OPERATIONS_CALENDAR_COPY } from "../constants/E2eOperationsCalendar.constants";
import { getMainRegion } from "../support/mainRegion";

export const createOperationsCalendarPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getView = (view: CalendarView): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_OPERATIONS_CALENDAR_COPY.VIEWS[view],
      exact: true,
    });

  return {
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: E2E_OPERATIONS_CALENDAR_COPY.HEADING,
      }),
    getView,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.OPERATIONS.CALENDAR);
    },
    selectView: async (
      view: CalendarView
    ): Promise<void> => {
      await getView(view).click();
    },
  };
};
