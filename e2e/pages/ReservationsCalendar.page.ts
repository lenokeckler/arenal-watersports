import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  CALENDAR_TEXT,
  PATHS,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import type { CalendarView } from "@/app/types";
import {
  E2E_RESERVATIONS_CALENDAR_COPY,
  E2E_RESERVATIONS_CALENDAR_SELECTORS,
} from "../constants/E2eReservationsCalendar.constants";
import { locateOriginBlock } from "../support/locateOriginBlock";
import { getMainRegion } from "../support/mainRegion";
import { createReservationsCalendarListPage } from "./ReservationsCalendarList.page";
import { createReservationsCalendarDatePage } from "./ReservationsCalendarDate.page";

export const createReservationsCalendarPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const reservationList =
    createReservationsCalendarListPage(page);
  const datePage = createReservationsCalendarDatePage(page);
  const getView = (view: CalendarView): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_RESERVATIONS_CALENDAR_COPY.VIEWS[view],
      exact: true,
    });
  return {
    ...datePage,
    getBlock: (customerName: string): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name: customerName,
      }),
    getCancelLink: (customerName: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: `${RESERVATIONS_CALENDAR_COPY.CANCEL_RESERVATION_LABEL} ${customerName}`,
      }),
    getModifyLink: (customerName: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: `${RESERVATIONS_CALENDAR_COPY.MODIFY_RESERVATION_LABEL} ${customerName}`,
      }),
    getOriginBlock: (
      customerName: string,
      originCode: string
    ): Locator =>
      locateOriginBlock(main, customerName, originCode),
    getPostponeLink: (customerName: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: `${RESERVATIONS_CALENDAR_COPY.POSTPONE_RESERVATION_LABEL} ${customerName}`,
      }),
    getSplitLink: (customerName: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: `${RESERVATIONS_CALENDAR_COPY.SPLIT_RESERVATION_LABEL} ${customerName}`,
      }),
    getHeading: (): Locator =>
      main.getByRole(ARIA_ROLE.HEADING, {
        name: E2E_RESERVATIONS_CALENDAR_COPY.HEADING,
      }),
    ...reservationList,
    getCreateReservationLink: (): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: RESERVATIONS_CALENDAR_COPY.CREATE_RESERVATION,
        exact: true,
      }),
    getPeriodAgenda: (): Locator =>
      main.getByRole(ARIA_ROLE.REGION, {
        name: RESERVATIONS_CALENDAR_COPY.PERIOD_AGENDA,
      }),
    getAgendaReservation: (
      agenda: Locator,
      customerName: string
    ): Locator =>
      agenda.getByText(customerName, { exact: true }),
    getReservationDetailLink: (
      customerName: string
    ): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: `${RESERVATIONS_CALENDAR_COPY.OPEN_RESERVATION_DETAIL} ${customerName}`,
        exact: true,
      }),
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
    getPeriodContent: (): Locator =>
      main.getByRole(ARIA_ROLE.GROUP, {
        name: CALENDAR_TEXT.PERIOD_CONTENT,
      }),
  };
};
