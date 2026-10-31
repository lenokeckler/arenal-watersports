import { CALENDAR_VIEW } from "@/app/constants";
import { expect } from "../support/activeWorkerTest";
import {
  E2E_RESERVATIONS_CALENDAR_DAY_SCREENSHOT,
  E2E_RESERVATIONS_CALENDAR_MONTH_SCREENSHOT,
  E2E_RESERVATIONS_CALENDAR_MONTH_SELECTION_SCREENSHOT,
  E2E_RESERVATIONS_CALENDAR_SCREENSHOT,
  E2E_RESERVATIONS_CALENDAR_WEEK_SCREENSHOT,
  E2E_RESERVATIONS_CALENDAR_YEAR_SCREENSHOT,
} from "../constants/E2eReservationsCalendar.constants";
import type { ReservationsCalendarHeatFixture } from "../support/models/ReservationsCalendarHeatFixture.interface";
import {
  getFirstCalendarHeatDay,
  waitForCalendarPeriod,
} from "../support/reservationsCalendarAssertions";
import {
  assertSelectedDayAgenda,
  assertSelectedMonthAgenda,
} from "../support/reservationsCalendarAgendaAssertions";
import { captureFullPage } from "../support/captureFullPage";
import type { ReservationsCalendarCaptureContext } from "./models/ReservationsCalendarCaptureContext.interface";

export const captureCalendarInitialState = async (
  context: ReservationsCalendarCaptureContext
): Promise<void> => {
  const { calendarPage, isMobile, page, projectName } =
    context;
  const createLink =
    calendarPage.getCreateReservationLink();
  await expect(calendarPage.getHeading()).toBeVisible();
  await waitForCalendarPeriod(page, calendarPage);
  await expect(createLink).toHaveCSS(
    "justify-content",
    "center"
  );
  await expect(createLink).toHaveCSS("width", "56px");
  await expect(createLink).toHaveCSS("height", "56px");
  await expect(createLink).toHaveCSS(
    "border-top-left-radius",
    "12px"
  );
  if (!isMobile) {
    await createLink.hover();
    await expect(createLink).toHaveCSS("width", "192px");
    await page.mouse.move(0, 0);
    await expect(createLink).toHaveCSS("width", "56px");
  }
  await captureFullPage(
    page,
    E2E_RESERVATIONS_CALENDAR_SCREENSHOT,
    projectName
  );
};

export const captureCalendarMonthState = async (
  context: ReservationsCalendarCaptureContext
): Promise<void> => {
  const { calendarPage, page, projectName } = context;
  await calendarPage.selectView(CALENDAR_VIEW.MONTH);
  await waitForCalendarPeriod(page, calendarPage);
  await captureFullPage(
    page,
    E2E_RESERVATIONS_CALENDAR_MONTH_SCREENSHOT,
    projectName
  );
};

export const captureCalendarDayAgenda = async (
  context: ReservationsCalendarCaptureContext,
  fixture: ReservationsCalendarHeatFixture
): Promise<void> => {
  const { calendarPage, page, projectName } = context;
  const selectedDay = getFirstCalendarHeatDay(fixture);
  await calendarPage.selectDay(
    selectedDay.date,
    selectedDay.count
  );
  await assertSelectedDayAgenda(calendarPage, selectedDay);
  await captureFullPage(
    page,
    E2E_RESERVATIONS_CALENDAR_DAY_SCREENSHOT,
    projectName
  );
};

export const captureCalendarYearState = async (
  context: ReservationsCalendarCaptureContext,
  fixture: ReservationsCalendarHeatFixture
): Promise<void> => {
  const { calendarPage, page, projectName } = context;
  const selectedDay = getFirstCalendarHeatDay(fixture);
  await calendarPage.selectView(CALENDAR_VIEW.YEAR);
  await waitForCalendarPeriod(page, calendarPage);
  await captureFullPage(
    page,
    E2E_RESERVATIONS_CALENDAR_YEAR_SCREENSHOT,
    projectName
  );
  await calendarPage.selectMonth(selectedDay.date);
  await assertSelectedMonthAgenda(
    calendarPage,
    selectedDay
  );
  await captureFullPage(
    page,
    E2E_RESERVATIONS_CALENDAR_MONTH_SELECTION_SCREENSHOT,
    projectName
  );
};

export const captureCalendarWeekState = async (
  context: ReservationsCalendarCaptureContext
): Promise<void> => {
  const { calendarPage, page, projectName } = context;
  await calendarPage.selectView(CALENDAR_VIEW.WEEK);
  await waitForCalendarPeriod(page, calendarPage);
  await captureFullPage(
    page,
    E2E_RESERVATIONS_CALENDAR_WEEK_SCREENSHOT,
    projectName
  );
};
