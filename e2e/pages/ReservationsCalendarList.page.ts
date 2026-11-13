import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  CALENDAR_TEXT,
  CALENDAR_VIEW,
  PATHS,
} from "@/app/constants";
import type { CalendarView } from "@/app/types";
import { RESERVATION_CALENDAR_AGENDA_PAGINATION_COPY } from "@/app/features/reservations/calendar/constants/ReservationCalendarAgendaPaginationCopy.constants";
import { E2E_RESERVATIONS_CALENDAR_COPY } from "../constants/E2eReservationsCalendar.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationsCalendarListPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getList = (): Locator =>
    main.getByRole(ARIA_ROLE.REGION, {
      name: E2E_RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA,
    });
  const getPagination = (): Locator =>
    main.getByRole(ARIA_ROLE.NAVIGATION, {
      name: RESERVATION_CALENDAR_AGENDA_PAGINATION_COPY.PAGE_NAVIGATION,
    });
  const getPageSize = (): Locator =>
    getPagination().getByRole(ARIA_ROLE.COMBOBOX, {
      name: E2E_RESERVATIONS_CALENDAR_COPY.PAGE_SIZE_LABEL,
    });
  const getCalendarViewButton = (
    view: CalendarView
  ): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: CALENDAR_TEXT.LABELS[view],
      exact: true,
    });

  return {
    getPeriodAgenda: getList,
    getReservationEntries: (): Locator =>
      getList().getByRole(ARIA_ROLE.GROUP),
    getPageSizeSelector: getPageSize,
    getNextPageButton: (): Locator =>
      getPagination().getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_RESERVATIONS_CALENDAR_COPY.NEXT_PAGE,
        exact: true,
      }),
    getPreviousPageButton: (): Locator =>
      getPagination().getByRole(ARIA_ROLE.BUTTON, {
        name: E2E_RESERVATIONS_CALENDAR_COPY.PREVIOUS_PAGE,
        exact: true,
      }),
    selectPageSize: async (
      pageSize: string
    ): Promise<void> => {
      await getPageSize().selectOption(pageSize);
    },
    selectMonthView: async (): Promise<void> => {
      await getCalendarViewButton(
        CALENDAR_VIEW.MONTH
      ).click();
    },
    selectYearView: async (): Promise<void> => {
      await getCalendarViewButton(
        CALENDAR_VIEW.YEAR
      ).click();
    },
    getPagination,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.RESERVATIONS.CALENDAR);
    },
    reload: async (): Promise<void> => {
      await page.reload();
    },
  };
};
