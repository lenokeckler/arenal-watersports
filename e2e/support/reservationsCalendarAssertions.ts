import type { Page } from "@playwright/test";
import {
  CALENDAR_VIEW,
  RESERVATIONS_CALENDAR_COPY,
} from "@/app/constants";
import {
  E2E_LOAD_STATE,
  E2E_TIMEOUT_MS,
} from "../constants/E2eRuntime.constants";
import {
  E2E_RESERVATIONS_CALENDAR_ERRORS,
  E2E_RESERVATIONS_CALENDAR_HEAT_CLASSES,
} from "../constants/E2eReservationsCalendar.constants";
import type { ReservationsCalendarHeatFixture } from "./models/ReservationsCalendarHeatFixture.interface";
import type { ReservationsCalendarPage } from "./models/ReservationsCalendarPage.type";
import { expect } from "./activeWorkerTest";
import {
  assertSelectedDayAgenda,
  assertSelectedMonthAgenda,
} from "./reservationsCalendarAgendaAssertions";

export const assertAvailableCalendarViews = async (
  calendarPage: ReservationsCalendarPage
): Promise<void> => {
  await expect(calendarPage.getHeading()).toBeVisible();
  await expect(
    calendarPage.getView(CALENDAR_VIEW.DAY)
  ).toBeVisible();
  await expect(
    calendarPage.getView(CALENDAR_VIEW.WEEK)
  ).toBeVisible();
  await expect(
    calendarPage.getView(CALENDAR_VIEW.MONTH)
  ).toBeVisible();
  await expect(
    calendarPage.getView(CALENDAR_VIEW.YEAR)
  ).toBeVisible();
};

export const waitForCalendarPeriod = async (
  page: Page,
  calendarPage: ReservationsCalendarPage
): Promise<void> => {
  await page.waitForLoadState(E2E_LOAD_STATE.NETWORK_IDLE, {
    timeout: E2E_TIMEOUT_MS.NAVIGATION,
  });
  await expect(
    calendarPage.getRefreshStatus()
  ).toBeHidden();
  await expect(
    calendarPage.getPeriodMessage(
      RESERVATIONS_CALENDAR_COPY.PARTIAL_COVERAGE
    )
  ).toBeHidden();
  await expect(
    calendarPage.getPeriodMessage(
      RESERVATIONS_CALENDAR_COPY.INCOMPLETE_RESULTS
    )
  ).toBeHidden();
};

export const assertCalendarHeatMap = async (
  calendarPage: ReservationsCalendarPage,
  fixture: ReservationsCalendarHeatFixture
): Promise<void> => {
  for (const heatDay of fixture.dates) {
    const daySelection = calendarPage.getDaySelection(
      heatDay.date,
      heatDay.count
    );
    const daySelectionClassName =
      await daySelection.getAttribute("class");
    expect(daySelectionClassName).toContain(
      E2E_RESERVATIONS_CALENDAR_HEAT_CLASSES[
        heatDay.heatLevel
      ]
    );
    await expect(
      calendarPage.getDayReservationCount(
        heatDay.date,
        heatDay.count
      )
    ).toBeVisible();
  }
};

export const getFirstCalendarHeatDay = (
  fixture: ReservationsCalendarHeatFixture
): ReservationsCalendarHeatFixture["dates"][number] => {
  const firstDay = fixture.dates[0];
  if (firstDay === undefined) {
    throw new Error(
      E2E_RESERVATIONS_CALENDAR_ERRORS.EMPTY_HEAT_FIXTURE
    );
  }
  return firstDay;
};

export const assertResponsiveWeekGrid = async (
  calendarPage: ReservationsCalendarPage,
  isMobile: boolean
): Promise<void> => {
  await expect(calendarPage.getWeekGrid()).toHaveCSS(
    "overflow-x",
    isMobile ? "auto" : "visible"
  );
};

export const exerciseReservationsCalendarInteractions =
  async (
    page: Page,
    calendarPage: ReservationsCalendarPage,
    fixture: ReservationsCalendarHeatFixture,
    isMobile: boolean
  ): Promise<void> => {
    await calendarPage.selectView(CALENDAR_VIEW.MONTH);
    await waitForCalendarPeriod(page, calendarPage);
    await assertCalendarHeatMap(calendarPage, fixture);
    const selectedDay = getFirstCalendarHeatDay(fixture);
    await calendarPage.selectDay(
      selectedDay.date,
      selectedDay.count
    );
    await assertSelectedDayAgenda(
      calendarPage,
      selectedDay
    );
    await calendarPage.selectView(CALENDAR_VIEW.YEAR);
    await waitForCalendarPeriod(page, calendarPage);
    await calendarPage.selectMonth(selectedDay.date);
    await assertSelectedMonthAgenda(
      calendarPage,
      selectedDay
    );
    await calendarPage.selectView(CALENDAR_VIEW.WEEK);
    await waitForCalendarPeriod(page, calendarPage);
    await assertResponsiveWeekGrid(calendarPage, isMobile);
  };
