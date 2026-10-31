import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  CALENDAR_TEXT,
  PATHS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type {
  CalendarDate,
  CalendarView,
} from "@/app/types";
import { formatCalendarDate } from "@/app/components/calendar/utils/formatCalendarPresentation";
import {
  E2E_RESERVATIONS_CALENDAR_COPY,
  E2E_RESERVATIONS_CALENDAR_SELECTORS,
} from "../constants/E2eReservationsCalendar.constants";
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
  const getDaySelection = (
    date: CalendarDate,
    count: number
  ): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: `${formatCalendarDate(date)}${RESERVATIONS_CALENDAR_COPY.RESERVATION_COUNT_SEPARATOR}${RESERVATIONS_CALENDAR_COPY.RESERVATION_COUNT_LABEL(count)}`,
      exact: true,
    });
  const getMonthSelection = (date: CalendarDate): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: formatCalendarDate(date, true),
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
    getDaySelection,
    getDayReservationCount: (
      date: CalendarDate,
      count: number
    ): Locator =>
      getDaySelection(date, count).getByText(
        count.toString(),
        { exact: true }
      ),
    getMonthSelection,
    getPeriodAgenda: (): Locator =>
      main.getByRole(ARIA_ROLE.REGION, {
        name: RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA,
      }),
    getAgendaReservation: (
      agenda: Locator,
      customerName: string
    ): Locator =>
      agenda.getByText(customerName, { exact: true }),
    getPeriodMessage: (message: string): Locator =>
      main.getByText(message, { exact: true }),
    getRefreshStatus: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS, {
        name: RESERVATIONS_CALENDAR_COPY.REFRESHING,
      }),
    getSelectedDayAgenda: (): Locator =>
      main.getByRole(ARIA_ROLE.REGION, {
        name: RESERVATIONS_CALENDAR_COPY.SELECTED_DAY_AGENDA,
      }),
    getSelectedMonthAgenda: (): Locator =>
      main.getByRole(ARIA_ROLE.REGION, {
        name: RESERVATIONS_CALENDAR_COPY.SELECTED_MONTH_AGENDA,
      }),
    getWeekGrid: (): Locator =>
      main.locator(
        E2E_RESERVATIONS_CALENDAR_SELECTORS.WEEK_GRID
      ),
    getView,
    goTo: async (): Promise<void> => {
      await page.goto(PATHS.RESERVATIONS.CALENDAR);
    },
    selectView: async (
      view: CalendarView
    ): Promise<void> => {
      await getView(view).click();
    },
    selectDay: async (
      date: CalendarDate,
      count: number
    ): Promise<void> => {
      await getDaySelection(date, count).click();
    },
    selectMonth: async (
      date: CalendarDate
    ): Promise<void> => {
      await getMonthSelection(date).click();
    },
    getPeriodContent: (): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name: CALENDAR_TEXT.PERIOD_CONTENT,
      }),
  };
};
