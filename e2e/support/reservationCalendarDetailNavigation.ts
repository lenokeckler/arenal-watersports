import type { Page } from "@playwright/test";
import { CALENDAR_VIEW } from "@/app/constants";
import {
  E2E_RESERVATIONS_CALENDAR_ERRORS,
  E2E_RESERVATIONS_CALENDAR_NAVIGATION_VIEWS,
} from "../constants/E2eReservationsCalendar.constants";
import type { ReservationsCalendarDetailNavigationPage } from "./models/ReservationsCalendarDetailNavigationPage.type";
import type { ReservationsCalendarHeatFixture } from "./models/ReservationsCalendarHeatFixture.interface";
import type { ReservationsCalendarHeatDay } from "./models/ReservationsCalendarHeatDay.interface";
import { E2E_RESERVATIONS_CALENDAR_MAX_DAY_PERIOD_ADVANCES } from "../constants/E2eReservationsCalendar.constants";
import { expect } from "./activeWorkerTest";
import {
  getFirstCalendarHeatDay,
  waitForCalendarPeriod,
} from "./reservationsCalendarAssertions";

const navigateCalendarDayToDate = async (
  page: Page,
  calendarPage: ReservationsCalendarDetailNavigationPage,
  date: ReservationsCalendarHeatDay["date"]
): Promise<void> => {
  const periodTitle = calendarPage.getPeriodTitle(date);
  for (
    let count = 0;
    count <
    E2E_RESERVATIONS_CALENDAR_MAX_DAY_PERIOD_ADVANCES;
    count += 1
  ) {
    if ((await periodTitle.count()) > 0) {
      return;
    }
    await calendarPage.goToNextPeriod();
    await waitForCalendarPeriod(page, calendarPage);
  }
  await expect(periodTitle).toBeVisible();
};

const prepareReservationCalendarView = async (
  page: Page,
  calendarPage: ReservationsCalendarDetailNavigationPage,
  heatDay: ReservationsCalendarHeatDay,
  view: (typeof E2E_RESERVATIONS_CALENDAR_NAVIGATION_VIEWS)[number]
): Promise<void> => {
  await calendarPage.goTo();
  await calendarPage.selectView(CALENDAR_VIEW.MONTH);
  await waitForCalendarPeriod(page, calendarPage);
  await calendarPage.selectDayByDate(heatDay.date);
  if (view !== CALENDAR_VIEW.MONTH) {
    await calendarPage.selectView(CALENDAR_VIEW.DAY);
    await waitForCalendarPeriod(page, calendarPage);
    await navigateCalendarDayToDate(
      page,
      calendarPage,
      heatDay.date
    );
  }
  if (view === CALENDAR_VIEW.WEEK) {
    await calendarPage.selectView(view);
    await waitForCalendarPeriod(page, calendarPage);
  }
};

const openReservationDetailWithKeyboard = async (
  page: Page,
  calendarPage: ReservationsCalendarDetailNavigationPage,
  customerName: string
): Promise<void> => {
  const reservationLink = calendarPage
    .getReservationDetailLink(customerName)
    .first();
  await expect(reservationLink).toBeVisible();
  const detailUrl =
    await reservationLink.getAttribute("href");
  if (detailUrl === null) {
    throw new Error(
      E2E_RESERVATIONS_CALENDAR_ERRORS.MISSING_DETAIL_LINK
    );
  }
  await calendarPage.focusReservationDetailLinkWithKeyboard(
    reservationLink
  );
  await calendarPage.activateFocusedReservationDetailLink();
  await expect(page).toHaveURL(detailUrl);
};

export const exerciseReservationCalendarDetailNavigation =
  async (
    page: Page,
    calendarPage: ReservationsCalendarDetailNavigationPage,
    fixture: ReservationsCalendarHeatFixture
  ): Promise<void> => {
    const heatDay = getFirstCalendarHeatDay(fixture);
    const [customerName] = heatDay.customerNames;
    if (customerName === undefined) {
      throw new Error(
        E2E_RESERVATIONS_CALENDAR_ERRORS.EMPTY_RESERVATION_NAMES
      );
    }
    for (const view of E2E_RESERVATIONS_CALENDAR_NAVIGATION_VIEWS) {
      await prepareReservationCalendarView(
        page,
        calendarPage,
        heatDay,
        view
      );
      await openReservationDetailWithKeyboard(
        page,
        calendarPage,
        customerName
      );
    }
  };
