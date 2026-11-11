import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  PATHS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { CalendarView } from "@/app/types";
import { E2E_OPERATIONS_CALENDAR_COPY } from "../constants/E2eOperationsCalendar.constants";
import { locateOriginBlock } from "../support/locateOriginBlock";
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
    getBlock: (customerName: string): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name: customerName,
      }),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: E2E_OPERATIONS_CALENDAR_COPY.HEADING,
      }),
    getOriginBlock: (
      customerName: string,
      originCode: string
    ): Locator =>
      locateOriginBlock(main, customerName, originCode),
    getSplitLink: (customerName: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: `${RESERVATIONS_CALENDAR_COPY.SPLIT_RESERVATION_LABEL} ${customerName}`,
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
