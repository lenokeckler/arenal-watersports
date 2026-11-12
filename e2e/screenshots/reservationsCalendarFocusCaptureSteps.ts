import { CALENDAR_VIEW } from "@/app/constants";
import { expect } from "../support/activeWorkerTest";
import {
  E2E_RESERVATIONS_CALENDAR_ERRORS,
  E2E_RESERVATIONS_CALENDAR_FOCUS_SCREENSHOT,
} from "../constants/E2eReservationsCalendar.constants";
import type { ReservationsCalendarHeatFixture } from "../support/models/ReservationsCalendarHeatFixture.interface";
import {
  getFirstCalendarHeatDay,
  waitForCalendarPeriod,
} from "../support/reservationsCalendarAssertions";
import { captureViewport } from "../support/captureViewport";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import type { ReservationsCalendarCaptureContext } from "./models/ReservationsCalendarCaptureContext.interface";

const focusReservationDetailLink = async (
  context: ReservationsCalendarCaptureContext,
  customerName: string
): Promise<void> => {
  const { calendarPage, page } = context;
  const reservationLink = calendarPage
    .getReservationDetailLink(customerName)
    .first();
  await expect(reservationLink).toBeVisible();
  await calendarPage.focusReservationDetailLinkWithKeyboard(
    reservationLink
  );
  await captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      E2E_RESERVATIONS_CALENDAR_FOCUS_SCREENSHOT,
      context.projectName
    )
  );
};

export const captureReservationCalendarDetailLinkFocus =
  async (
    context: ReservationsCalendarCaptureContext,
    fixture: ReservationsCalendarHeatFixture
  ): Promise<void> => {
    const selectedDay = getFirstCalendarHeatDay(fixture);
    const [customerName] = selectedDay.customerNames;
    if (customerName === undefined) {
      throw new Error(
        E2E_RESERVATIONS_CALENDAR_ERRORS.EMPTY_RESERVATION_NAMES
      );
    }
    await context.calendarPage.selectView(
      CALENDAR_VIEW.MONTH
    );
    await waitForCalendarPeriod(
      context.page,
      context.calendarPage
    );
    await context.calendarPage.selectDayByDate(
      selectedDay.date
    );
    await focusReservationDetailLink(context, customerName);
  };
